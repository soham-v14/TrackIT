import React, {useEffect, useState} from 'react'
import { input, Table } from 'antd'; // or from wherever you're using Table
import { useAuthState } from "react-firebase-hooks/auth";
import { Select, Radio } from 'antd';
import Search from 'antd/es/transfer/search';
import SearchImg from "../../assets/search.svg"
import { unparse , parse } from 'papaparse';
import { toast } from "react-toastify";


function TransactionTable({transactions, addTransaction, fetchTransactions}) {
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const { Option } = Select;
    const [sortKey, setSortKey] = useState("");
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Tag',
            dataIndex: 'tag',
            key: 'tag',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'Date',
        },
        
        ];
    let filteredTransactions = transactions.filter((item) => 
                                item.name.toLowerCase().includes(search.toLowerCase())
                                && item.type.includes(typeFilter)
                                );

    let sortedTransactions = filteredTransactions.sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
    });

    function exportCSV(){
        var csv = unparse({
            fields : ["name", "amount", "tag", "type", "date"],
            data: transactions,
            
        });
        var blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
        var csvURL = window.URL.createObjectURL(blob);
        const link =  document.createElement("a");
        link.href = csvURL;
        link.download = "transactions.csv"
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function importFromCsv(event) {
    event.preventDefault();
    try {
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
            for(const transaction of results.data){
                console.log("Transactions", transaction);
                const newTransaction = {
                    ...transaction,
                    amount: parseFloat(transaction.amount),
                };
                await addTransaction(newTransaction, true)
            }
        },
      });
      toast.success("All Transactions are Added!")
      fetchTransactions();
      event.target.files = null;
    } catch (e) {
    //   toast.error(e.message);
    }
  }


    return (
        <div
      style={{
        width: "95%",
        padding: "0rem 2rem",
        
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
            <div className='input-flex'>
                <img src={SearchImg} width="16" />
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search by name'
                />
            </div>


            <Select
            className="select-input"
            onChange={(value) => setTypeFilter(value)}
            value={typeFilter}
            placeholder="Filter"
            allowClear
            >
            <Option value="">All</Option>
            <Option value="income">Income</Option>
            <Option value="expense">Expense</Option>
            </Select>
            </div>

            

        <div className="my-table">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "1rem",
          }}
        >
          <h2>My Transactions</h2>

          <Radio.Group
            className="input-radio"
            onChange={(e) => setSortKey(e.target.value)}
            value={sortKey}
          >
            <Radio.Button value="">No Sort</Radio.Button>
            <Radio.Button value="date">Sort by Date</Radio.Button>
            <Radio.Button value="amount">Sort by Amount</Radio.Button>
          </Radio.Group>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              width: "400px",
            }}
          >
            <button className="btn" onClick={exportCSV} >
              Export to CSV
            </button>
            <label for="file-csv" className="btn btn-blue">
              Import from CSV
            </label>
            <input
              id="file-csv"
              type="file"
              accept=".csv"
              required
              onChange={importFromCsv}
              style={{ display: "none" }}
            />
          </div>
        </div>
        
            <Table dataSource={sortedTransactions} columns={columns} />
            </div>
        </div>
  ); 
}

export default TransactionTable;
