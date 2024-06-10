import {RecoilRoot} from "recoil";
import {ExpenseMain} from "./ExpenseMain";
import {render, screen, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {expensesState} from "../state/expenses";


const renderComponent = () => {
    render(
        <RecoilRoot>
            <ExpenseMain />
        </RecoilRoot>
    )

    const dateInput = screen.getByPlaceholderText(/결제한 날짜/i)
    const descInput = screen.getByPlaceholderText(/비용에 대한 설명/i)
    const amountInput = screen.getByPlaceholderText(/비용은 얼마/i)
    const payerInput = screen.getByPlaceholderText(/누가 결제/i)
    const addButton = screen.getByPlaceholderText('추가하기')

    return (
        dateInput,
        descInput,
        amountInput,
        payerInput,
        addButton
    )

}
describe('비용 정산 메인 페이지', () => {

    describe('비용 추가 컴포넌트', () => {

        test('비용 추가 컴포넌트 랜더링', () => {
                const {dateInput, descInput, amountInput, payerInput, addButton} = renderComponent()

            expect(dateInput).toBeInTheDocument()
            expect(descInput).toBeInTheDocument()
            expect(amountInput).toBeInTheDocument()
            expect(payerInput).toBeInTheDocument()
            expect(addButton).toBeInTheDocument()



        })

        test('비용 추가에 필수입력 값을 채우지 않고, 추가 버튼 클릭 시, 에러 메시지 노출', async () => {
            const {addButton} = renderComponent()

            expect(addButton).toBeInTheDocument()
            await userEvent.click(addButton)

            const descErrorMessage = screen.getByText('비용내용을 입력해주셔야 합니다.')
            expect(descErrorMessage).toBeInTheDocument()

            const payerErrorMessage = screen.getByText('결제자를 선택해주셔야 합니다.')
            expect(payerErrorMessage).toBeInTheDocument()

            const amountErrorMessage = screen.getByText('금액을 선택해주셔야 합니다.')
            expect(amountErrorMessage).toBeInTheDocument()

        })

        test('비용 추가에 필수적인 값들을 입력하고 추가 버튼 클릭시, 저장 성공', async () => {
            const {dateInput, descInput, amountInput, payerInput, addButton} = renderComponent()
            await userEvent.type(descInput, '장보기')
            await userEvent.type(amountInput, '30000')
            await userEvent.selectOptions(payerInput, '영수') // 테스트 돌리기 전에 payerlist 셋업
            await userEvent.click(addButton)

            const descErrorMessage = screen.queryByText('비용내용을 입력해주셔야 합니다.\'')
            expect(descErrorMessage).not.toBeInTheDocument()

            const payerErrorMessage = screen.queryByText('결제자를 선택해주셔야 합니다.')
            expect(payerErrorMessage).not.toBeInTheDocument()

            const amountErrorMessage = screen.queryByText('금액을 선택해주셔야 합니다.')
            expect(amountErrorMessage).not.toBeInTheDocument()
            
        })
    })


    describe('비용 리스트 컴포넌트', () => {

        test('비용 리스트 컴포넌트가 랜더링 되는가?', () => {
            renderComponent()
            const expenseListComponent = screen.getByTestId('expenseList')
            expect(expenseListComponent).toBeInTheDocument()
        })
    })

    describe('정산결과 컴포넌트', () => {
        test('정산결과 컴포넌트가 랜더링 되는가?', () => {
            renderComponent()
            const component = screen.getByText(/정산은 이렇게/i)
            expect(component).toBeInTheDocument()

        })
    })


    describe('새로운 비용이 입력 되었을때', () => {

        const addNewExpense = async () => {
            const {dateInput, descInput, payerInput, amountInput, addButton} = renderComponent()

            await userEvent.type(dateInput, '2022-10-10')
            await userEvent.type(descInput, '장보기')
            await userEvent.type(amountInput, '30000')
            await userEvent.selectOptions(payerInput, '영수')
            await userEvent.click(addButton)

        }

        test('날짜, 내용, 결제자, 금액 데이터가 정산 리스트에 추가 된다.', async () => {
            await addNewExpense()

            const expenseListComponent = screen.getByTestId('expenseList')
            const dataValue = within(expenseListComponent).getByText('2022-10-10')
            expect(dataValue).toBeInTheDocument()

            const descValue = within(expenseListComponent).getByText('장보기')
            expect(descValue).toBeInTheDocument()

            const payerValue = within(expenseListComponent).getByText('영수')
            expect(payerValue).toBeInTheDocument()

            const amountValue = within(expenseListComponent).getByText('30000원')
            expect(amountValue).toBeInTheDocument()

        })

        test('정산결과 또한 업데이트 된다.', async () => {
            await addNewExpense()

            const totalText = screen.getByText(/2명 - 총 30000원 지출/i)
            expect(totalText).toBeInTheDocument()

            const transactionText = screen.getByText(/영희가 영수에게 15000원/i)
            expect(transactionText).toBeInTheDocument()
        })

    })


})

