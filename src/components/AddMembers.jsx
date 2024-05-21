import {CenteredOverlayForm} from "./CenteredOverlayForm";
import {Button, Container, Form, Row} from "react-bootstrap";
import {InputTags} from "react-bootstrap-tagsinput";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {groupMembersState} from "../state/groupMembers";
import {useState} from "react";
import {groupNameState} from "../state/groupName";

export const AddMembers = () => {
    const [groupMembers, setGroupMembers] = useRecoilState(groupMembersState)
    const groupName = useRecoilValue(groupNameState)
    const [formSubmitted, setFormSubmitted] = useState(false)
    const handleSubmit = (event) => {
        event.preventDefault()
        setFormSubmitted(true)
    }

    return (
        <CenteredOverlayForm>
            <Container>
                <Form noValidate onSubmit={handleSubmit}>
                    <Row>
                        <h2>그룹에 속한 사람들의 이름을 모두 적어주세요.</h2>
                    </Row>
                    <Row>
                       <InputTags onTags={(value)=> setGroupMembers(value.values)} placeholder={"이름간 띄어쓰기"}></InputTags>
                        {formSubmitted && groupMembers.length === 0 && <span>그룹 멤버들의 이름을 입력해주세요.</span>}
                    </Row>
                    <Row>
                        <Button type="submit">저장</Button>
                    </Row>
                </Form>
            </Container>
        </CenteredOverlayForm>
    )
}