import {useRecoilValue} from "recoil";
import {expensesState} from "../state/expenses";
import {groupMembersState} from "../state/groupMembers";
import styled from "styled-components";
import {StyledTitle} from "./AddExpenseForm";
import * as htmlToImage from "html-to-image";
import {toPng} from "html-to-image";
import {useRef} from "react";
import {Button} from "react-bootstrap";
import {Download} from "react-bootstrap-icons";
export const calculateMinimumTransaction = (expenses, members, amountPerPerson) => {
    const minTransaction = []

    if(amountPerPerson === 0) {
        return minTransaction
    }

    // 1. 사람별로 냈어야할금액
    const membersToPay = {}
    members.forEach(member => {
        membersToPay[member] = amountPerPerson
    })

    // 2. 사람별로 냈어야할 금액 업데이트
    expenses.forEach(({payer, amount}) => {
        membersToPay[payer] -= amount
    })

    // 3.
    const sortedMembersToPay = Object.keys(membersToPay)
        .map(member => (
            {member : member , amount: membersToPay[member]}
        ))
        .sort((a, b) => a.amount - b.amount)

    let left = 0
    let right = sortedMembersToPay.length - 1
    while(left < right) {

        while(left < right && sortedMembersToPay[left].amount === 0) {
            left++
        }
        while(left < right && sortedMembersToPay[right].amount === 0) {
            right--
        }

        const toReceive = sortedMembersToPay[left]
        const toSend = sortedMembersToPay[right]
        const amountToReceive = Math.abs(toReceive.amount)
        const amountToSend = Math.abs(toSend.amount)

        if(amountToSend > amountToReceive) {
            minTransaction.push({
                receiver : toReceive.member,
                payer: toSend.member,
                amount : amountToReceive
            })
            toReceive.amount = 0
            toSend.amount -= amountToReceive
            left++

        }else {
            minTransaction.push({
                receiver: toReceive.member,
                sender: toSend.member,
                amount : amountToSend
            })
            toSend.amount = 0
            toReceive.amount += amountToSend
            right--
        }
    }


    return minTransaction
}
export const SettlementSummary = () => {

    const expenses = useRecoilValue(expensesState)
    const members = useRecoilValue(groupMembersState)
    //const totalExpenseAmount = parseInt(expenses.reduce((prevAmount, curAmount) => prevAmount + curAmount))
    const totalExpenseAmount = parseFloat(expenses.reduce((prevAmount, curExpense) => prevAmount + parseFloat(curExpense.amount), 0)).toFixed(2)
    const groupMembersCount = members.length
    const splitAmount = totalExpenseAmount / groupMembersCount
    const ref = useRef(null)

    // to-do : 핵심 로직 구현
    const minimumTransaction = calculateMinimumTransaction(expenses, members, splitAmount)

    const exportToImage = () => {
        toPng(ref.current, { cacheBust: true, filter: (node) => node.tagName !== 'BUTTON' })
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = 'my-image-name.png'
                link.href = dataUrl
                link.click()
            })
            .catch((err) => {
                console.log(err)
            })

    }

    return (
        <StyledWrapper ref={ref}>
            <div>
                <StyledTitle>2. 정산은 이렇게</StyledTitle>


                {totalExpenseAmount > 0 && groupMembersCount > 0 && (
                    <>

                        <StyledSummary>
                            <span>{groupMembersCount} 명이서 총 {parseInt(totalExpenseAmount)}원 지출</span>
                            <br/>
                            <span>한 사람 당 인 당 {splitAmount} 원</span>
                        </StyledSummary>

                        <StyledUl>
                            {minimumTransaction.map(({sender, receiver, amount}, index) =>
                                <li key={`transaction-${index}`}>
                                    <span>{sender}(이)가 {receiver}에게 {amount}원 보내기</span>
                                </li>
                            )}
                        </StyledUl>
                        <StyledButton onClick={exportToImage}>
                            <Download />
                        </StyledButton>
                    </>
                )}
            </div>
        </StyledWrapper>
    )
}

const StyledButton = styled.button`
    background: none;
    border: none;
    font-size: 25px;
    position: absolute;
    top: 15px;
    right: 15px;
    
    &:hover, &:active {
        background: none;
        color: #683BA1;
    }
`


const StyledDownload = styled.svg`
    margin-left: 45vh;
`

const StyledWrapper = styled.div`
    padding: 50px;
    background-color: #683BA1;
    color: #FFFBFB;
    box-shadow: 3px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    text-align: center;
    font-size: 22px;
    position: relative;
`
const StyledUl = styled.ul`
    margin-top: 31px;
    font-weight: 600;
    line-height: 200%;

    list-style-type: disclosure-closed;

    li::marker {
        animation: blinker 1.5s linear infinite;
    }

    @keyframes blinker {
        50% {
            opacity: 0;
        }
    }
`

const StyledSummary = styled.div`
    margin-top: 31px;
`