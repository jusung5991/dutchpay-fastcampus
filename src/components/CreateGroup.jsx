import {CenteredOverlayForm, StyledSubmitButton} from "./CenteredOverlayForm";
import {Button, Container, Form, Row} from "react-bootstrap";
import {useRecoilState} from "recoil";
import {groupNameState} from "../state/groupName";
import {useState} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

export const CreateGroup = () => {
    const [groupName, setGroupName] = useRecoilState(groupNameState)
    const [validGroupName, setValidGroupName] = useState(false)
    const [validated, setValidated] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget
        if(form.checkValidity()) {
            setValidGroupName(true)
            navigate("/members")

        } else {
            event.stopPropagation();
            setValidGroupName(false)
        }
        setValidated(true)
    }
    return (
        <div>
            <CenteredOverlayForm
                title="먼저, 더치페이할 그룹의 이름을 정해볼까요?"
                validated={validated}
                handleSubmit={handleSubmit}
            >
                <Form.Group controlId={"validationGroupName"}>
                    <Form.Control type={"text"} required placeholder="2022 제주도 여행"
                                  onChange={(e) => setGroupName(e.target.value)}/>
                    <Form.Control.Feedback type="invalid" data-valid={validGroupName}>
                        그룹 이름을 입력해 주세요.
                    </Form.Control.Feedback>
                </Form.Group>
            </CenteredOverlayForm>
            {/*<CenteredOverlayForm />*/}
        </div>
    )
}
