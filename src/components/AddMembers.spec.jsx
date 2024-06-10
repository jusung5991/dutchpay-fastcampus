import {RecoilRoot} from "recoil";
import {AddMembers} from "./AddMembers";
import {render, screen} from "@testing-library/react";
import * as test from "node:test";
import userEvent from "@testing-library/user-event";


const renderComponent = () => {
    render (
        <RecoilRoot>
            <AddMembers />
        </RecoilRoot>
    )

    const input = screen.getByTestId("input-member-names")
    const saveButton = screen.getByText('저장')

    return {
        input,
        saveButton
    }
}

describe('그룹의 멤버', () => {
    test('그룹 멤버 입력 컴포넌트가 랜더링되는가,', () => {
        const {input, saveButton} = renderComponent()

        expect(input).not.toBeNull()
        expect(saveButton).not.toBeNull()
    })

    test('그룹 멤버 입력하지않고 저장 버튼 클릭시 에러메시지 노출,', async () => {
        const {saveButton} = renderComponent()
        await userEvent.click(saveButton)

        const errorMessage = await screen.findByText('그룹 멤버들의 이름을 입력해주세요.')
        expect(errorMessage).toBeInTheDocument()
    })

    test('그룹 멤버의 이름을 입력한 후, 저장버튼 클릭 시 저장성공,', async () => {
        const {input, saveButton} = renderComponent()

        await userEvent.type(input, '철수 영희 영수')
        await userEvent.click(saveButton)

        const errorMessage = screen.queryByText('그룹 멤버들의 이름을 입력해주세요.')
        expect(errorMessage).toBeNull()
    })
})