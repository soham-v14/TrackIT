import React from 'react'
import "./style.css";
import { Row, Card} from 'antd';
import Button from '../Button';
function Cards({income, expense, totalBalance, showExpenseModal, showIncomeModal}) {
  return (
    <div >
      <Row className='my-row'>

        <Card className='my-card' title="Current Balance">
            <p>{totalBalance}</p>
            <Button text="Reset Balance" blue={true} />
        </Card>

        <Card className='my-card' title="Total Income">
            <p>{income}</p>
            <Button text="Add Income" blue={true}  onClick={showIncomeModal}/>
        </Card>

        <Card className='my-card' title="Total Expense">
            <p>{expense}</p>
            <Button text="Add Expense" blue={true} onClick={showExpenseModal}/>
        </Card>

      </Row>
    </div>
  );
}

export default Cards;
