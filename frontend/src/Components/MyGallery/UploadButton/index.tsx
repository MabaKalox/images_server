import React, {useRef, useState} from "react";
import {Button, ButtonGroup} from "react-bootstrap";
import './style.scss'
import axios from "axios";

type UploadButtonProps = {
    upload_url: string
    update_list_handler: () => void
}

enum UploadStateEnum {
    Initial,
    Loading,
    Error,
    Success
}

const GetIcon = (upload_state: UploadStateEnum) => {
    switch (upload_state) {
        case UploadStateEnum.Initial:
            return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        className="bi bi-cloud-arrow-up" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                      d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"/>
                <path
                    d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
            </svg>
        case UploadStateEnum.Loading:
            return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        className="bi bi-arrow-clockwise loading" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                <path
                    d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
            </svg>
        case UploadStateEnum.Error:
            return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        className="bi bi-file-earmark-excel" viewBox="0 0 16 16">
                <path
                    d="M5.884 6.68a.5.5 0 1 0-.768.64L7.349 10l-2.233 2.68a.5.5 0 0 0 .768.64L8 10.781l2.116 2.54a.5.5 0 0 0 .768-.641L8.651 10l2.233-2.68a.5.5 0 0 0-.768-.64L8 9.219l-2.116-2.54z"/>
                <path
                    d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
            </svg>
        case UploadStateEnum.Success:
            return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        className="bi bi-check2-circle" viewBox="0 0 16 16">
                <path
                    d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                <path
                    d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
            </svg>
    }
}

const get_button_v = (upload_state: UploadStateEnum) => {
    switch (upload_state) {
        case UploadStateEnum.Error:
            return 'warning'
        case UploadStateEnum.Success:
            return 'success'
        default:
            return 'info'
    }
}

const UploadButton = (props: UploadButtonProps) => {
    const [is_file_chosen, set_is_file_chosen] = useState(false)
    const [upload_state, set_upload_state] = useState<UploadStateEnum>(UploadStateEnum.Initial)

    const upload_input_element = useRef<HTMLInputElement>(null)

    const upload_file = () => {
        if (upload_input_element && upload_input_element.current && is_file_chosen) {
            if (
                upload_input_element.current.files &&
                upload_input_element.current.files.length === 1
            ) {
                set_upload_state(UploadStateEnum.Loading)
                const file_name = upload_input_element.current.files[0].name
                const form_data = new FormData();
                form_data.append('file', upload_input_element.current.files[0])
                axios.post(props.upload_url, form_data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((response) => {
                    props.update_list_handler()
                    set_upload_state(UploadStateEnum.Success)
                }).catch((error) => {
                    set_upload_state(UploadStateEnum.Error)
                    if (error.response) {
                        alert([
                            `Enable to Upload file: ${file_name}`,
                            `message: ${error.response.data.detail}`,
                            `code: ${error.response.status}`
                        ].join('\n'))
                    }
                }).finally(() => {
                    // @ts-ignore
                    // upload_icon_element.current.style.animationPlayState = 'paused';
                })
            }
        }
    }

    const file_chosen_handler = () => {
        set_upload_state(UploadStateEnum.Initial)
        if (upload_input_element && upload_input_element.current) {
            if (upload_input_element.current.files && upload_input_element.current.files.length === 1) {
                set_is_file_chosen(true)
            } else {
                set_is_file_chosen(false)
            }
        }
    }

    return (
        <div>
            <ButtonGroup>
                <label htmlFor="actual-upload-btn" className="my-0 btn btn-dark select_file_btn">Select File</label>
                <Button onClick={upload_file} variant={get_button_v(upload_state)}
                        disabled={!is_file_chosen}>
                    {GetIcon(upload_state)}
                </Button>
            </ButtonGroup>
            <input onChange={file_chosen_handler} ref={upload_input_element} hidden type="file" id="actual-upload-btn"/>
        </div>
    )
}

export default UploadButton
