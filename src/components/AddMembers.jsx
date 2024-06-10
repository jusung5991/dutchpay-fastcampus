import {CenteredOverlayForm} from "./CenteredOverlayForm";
import {InputTags} from "react-bootstrap-tagsinput";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {groupMembersState} from "../state/groupMembers";
import {useState} from "react";
import {groupNameState} from "../state/groupName";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {ROUTE} from "../route";

export const AddMembers = () => {
    const [groupMembers, setGroupMembers] = useRecoilState(groupMembersState)
    const groupName = useRecoilValue(groupNameState)
    const [validated, setValidated] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault()
        setValidated(true)
        if(groupMembers.length > 0) {
            navigate(ROUTE.EXPENSE_MAIN)
        }
    }

    const header = `${groupName} 그룹에 속한 사람들의 이름을 모두 적어주세요.`

    return (
        <CenteredOverlayForm
        title={header}
        validated={validated}
        handleSubmit={handleSubmit}>

       <InputTags data-testid="input-member-names" onTags={(value)=> setGroupMembers(value.values)} placeholder={"이름간 띄어쓰기"}></InputTags>

        {validated && groupMembers.length === 0 && <StyledErrorMessage>그룹 멤버들의 이름을 입력해주세요.</StyledErrorMessage>}


        </CenteredOverlayForm>
    )
}

const StyledErrorMessage = styled.span`
    color: red;
`