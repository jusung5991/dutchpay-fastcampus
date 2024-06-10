import {AddMembers} from "./AddMembers";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useState} from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {groupMembersState} from "../state/groupMembers";
import {expensesState} from "../state/expenses";
import button from "bootstrap/js/src/button";
import styled from "styled-components";

export const AddExpenseForm = () => {
    const members = useRecoilValue(groupMembersState)
    //const members = ['영수']

    const today = new Date()
    const [date, setDate] = useState([today.getFullYear, today.getMonth()+1, today.getDate()].join("-"))
    const [desc, setDesc] = useState('')
    const [amount, setAmount] = useState(0)
    const [payer, setPayer] = useState(null)
    const [validated, setValidated] = useState(false)
    const [isDescValid, setIsDescValid] = useState(false)
    const [isPayerValid, setIsPayerValid] = useState(false)
    const [isAmountValid, setIsAmountValid] = useState(false)

    const setExpense = useSetRecoilState(expensesState)
    const expense = useRecoilValue(expensesState)

    const handleSubmit = (event) => {
        event.preventDefault()

        const checkFormValidity = () => {
            const descValid = desc?.length > 0
            const payerValid = payer !== null
            const amountValid = amount > 0

            setIsDescValid(descValid)
            setIsPayerValid(payerValid)
            setIsAmountValid(amountValid)

            return descValid && payerValid && amountValid
        }

        const form = event.currentTarget
        if (checkFormValidity()) {
            // 처리

            // 리코일스테이트 저장
            const newExpense = {
                date,
                desc,
                amount,
                payer
            }

            setExpense(expense => [
                ...expense, newExpense
            ])

            setValidated(true)
        }
    }

    return (
        <StyledWrapper>
            <Form noValidate onSubmit={handleSubmit}>
                <StyledTitle>1. 비용 추가하기</StyledTitle>
                <Row>
                    <Col xs={12}>
                        <StyledFormGroup>
                            <Form.Control type={"date"}
                                          name={"expenseDate"}
                                          placeholder={"결제한 날짜를 선택해주세요."}
                                          value={date}
                                          onChange={(e) => setDate(e.target.value)}/>
                        </StyledFormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <StyledFormGroup>
                            <Form.Control
                                type={"text"}
                                placeholder={"비용에 대한 설명을 입력해 주세요."}
                                value={desc}
                                isValid={isDescValid}
                                isInvalid={!isDescValid && validated}
                                onChange={(e) => setDesc(e.target.value)}/>
                            <Form.Control.Feedback type={"invalid"} data-valid={isDescValid}>
                                비용 내용을 입력해주셔야 합니다.
                            </Form.Control.Feedback>
                        </StyledFormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} lg={6}>
                        <StyledFormGroup>
                            <Form.Control type={"number"}
                                          required
                                          placeholder={"비용은 얼마였나요?"}
                                          value={amount}
                                          isValid={isAmountValid}
                                          isInvalid={!isAmountValid && validated}
                                          onChange={(e) => setAmount(e.target.value)}/>
                            <Form.Control.Feedback type={"invalid"} data-valid={isAmountValid}>
                                1원 이상의 금액을 입력해주셔야합니다.
                            </Form.Control.Feedback>
                        </StyledFormGroup>
                    </Col>
                    <Col xs={12} lg={6}>
                        <StyledFormGroup>
                            <Form.Select
                                onChange={(target) =>setPayer(target.currentTarget.value)}
                                isValid={isPayerValid}
                                defaultValue={""}
                                className={"form-control"}
                                isInvalid={!isPayerValid && validated}>
                                <option disabled value="">누가 결제 했나요?</option>
                                {/*<option>A</option>*/}
                                {/*<option>B</option>*/}
                                {/*<option>C</option>*/}
                                {/*<option>D</option>*/}

                                {members.map(member =>
                                    <option key={member} value={member}>{member}</option>
                                )}
                            </Form.Select>
                            <Form.Control.Feedback type={"invalid"} data-valid={isPayerValid}>
                                결제자를 선택해 주셔야합니다.
                            </Form.Control.Feedback>
                        </StyledFormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className={"d-grid gap-2"}>
                        <StyledSubmitButton>추가하기</StyledSubmitButton>
                    </Col>
                </Row>
            </Form>
        </StyledWrapper>
    )
}

const StyledFormGroup = styled(Form.Group)`
    margin-bottom: 15px;
    input, select {
        background: #59359A;
        box-shadow: 2px 2px 4px rgba(0,0,0,0.25);
        border-radius: 8px;
        border: 0;
        color: #F8F9FA;
        height: 45px;
    }

    &:focus {
        color: #F8F9FA;
        background: #59359A;
        filter: brightness(80%);
    }

    ::placeholder {
        color: #F8F9FA;
    }
`

export const StyledTitle = styled.h3`
    color: #FFFBFB;
    text-align: center;
    font-weight: 700;
    font-size: 40px;
    line-height: 48px;
    letter-spacing: 0.25px;
    margin-bottom: 15px;

`

const StyledWrapper = styled.div`
    padding: 50px;
    background-color: #683BA1;
    box-shadow: 3px 0px 4px rgba(0,0,0,0.25);
    border-radius: 15px;

    
`

const StyledSubmitButton = styled(Button).attrs({
    type : 'submit'
})`
    width: 100%;
    height: 60px;
    padding: 16px 32px;
    border: 0px;
    border-radius: 8px;
    background-color: #E2D9F3;
    color: #59359A;
    margin-top: 10px;

    &:hover, &:focus {
        background-color: #209F;
        fillter: rgba(0,0,0,3);
    }
`