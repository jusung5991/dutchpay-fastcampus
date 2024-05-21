import {CreateGroup} from "./CreateGroup";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {RecoilRoot} from "recoil";

const renderComponent = () => {

    render(

            <RecoilRoot>
                <CreateGroup />
            </RecoilRoot>

    )


    const input = screen.getByPlaceholderText('2022 제주도 여행')
    const saveButton = screen.getByText('저장')
    const errorMessage = screen.getByText('그룹 이름을 입력해 주세요.')

    return {
        input,
        saveButton,
        errorMessage
    }

}

describe('그룹생성페이지', () => {

    test('그룹 이름 입력 컴포넌트 랜더링 되는가', () => {
        const {input, saveButton} = renderComponent()

        expect(input).not.toBeNull()
        expect(saveButton).not.toBeNull()

    })

    test('그룹 이름 입력 안하고 저장 클릭시 에러', async () => {
        const {saveButton, errorMessage} = renderComponent()
        await userEvent.click(saveButton)

        expect(errorMessage).toHaveAttribute('data-valid', 'false')
    })

    test('그룹 이름을 입력 후, 저장버튼 클릭시 저장 성공', async () => {
        const {input, saveButton, errorMessage} = renderComponent()

        await userEvent.type(input, '예시 그룹명')
        await userEvent.click(saveButton)

        expect(errorMessage).toHaveAttribute('data-valid', 'true')
    })

});