import {useRecoilValue} from "recoil";
import {expensesState} from "../state/expenses";
import {Table} from "react-bootstrap";
import styled from "styled-components";

export const ExpenseTable = () => {

    const expenses = useRecoilValue(expensesState)

    console.log(expenses)

    return (

     <Table data-testid={"expenseList"} borderless hover responsive>
         <StyledThead>
         <tr>
             <th>날짜</th>
             <th>내용</th>
             <th>결제자</th>
             <th>금액</th>
         </tr>
         </StyledThead>
         <StyledBody>
         {expenses.map(({date, desc, amount, payer}, idx) => (
             <tr key={`expense-${idx}`}>
                 <td>{date}</td>
                 <td>{desc}</td>
                 <td>{payer}</td>
                 <td>{amount} 원</td>
             </tr>
         ))}
         </StyledBody>


     </Table>

    )
}

const StyledThead = styled.thead`
    color: #683DA6;
    text-align: center;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    
    th {
        padding: 20px 8px;
    }
`

const StyledBody = styled.tbody`
    color: #683DA6;
    text-align: center;

    
    td {
        font-weight: 700;
        font-size: 24px;
        line-height: 29px;
    }
`