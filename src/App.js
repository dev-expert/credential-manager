import React from 'react';
import { history, divStyles } from '../../_helpers';
import Select from 'react-select';
import Dropzone from 'react-dropzone';
import {
    Input
    , Button
    , Modal
    , ModalBody
    , ModalFooter
    , Container
    , Fa
    , Card
    , CardBody
    , CardTitle
} from "mdbreact";
export class ClassroomAdd extends React.Component {
    constructor(props) {
        super(props);
        const { gradeContent } = this.props;
        this.state = {
            files: [],
            classRoomName: '',
            gradeId: '',
            modal: false,
            options: gradeContent.data.map(g => {
                var option = {};
                option = {
                    value: g.id,
                    label: g.name
                }
                return option;
            }) 
        };        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);        
    }

    onDrop(files) {
        this.setState({
            files: files.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
          }))
        });
    }

    componentDidMount(prevProps) {
        if (this.props.gradeContent.data && this.props.gradeContent.data[0].id !== this.state.gradeId) {
            const g = this.props.gradeContent.data[0];
            this.setState({
                gradeId: g.id
            });
        }
    }

    componentWillUnmount() {
        // Make sure to revoke the data uris to avoid memory leaks
        this.state.files.forEach(file => URL.revokeObjectURL(file.preview))
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: target.value
        });
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleSubmit(event) {
        var attachs = [];
        if (this.state.files !== null && this.state.files.length > 0) {
            attachs.push(this.state.files[0]);
        }
        const model = {
            "schoolId": "",
            "branchId": this.props.rUserProfile.t.branchId,
            "educatorId": this.props.rUserProfile.t.educator.id,
            "gradeId": this.state.gradeId,
            "name": this.state.classRoomName,
            "colorCode": "#e2343c",
            "classCode": "",
            "motto": "",
            "studentIds": [],
            "attachmentIds": attachs
        };
        this.props.handleAdd(model);
        this.setState({ modal: false });
    }

    render() {
        const { modal, classRoomName, files , options, gradeId } = this.state;       
        return (
            <div className="col-md-6 col-lg-4">
                <Card className="add-classroom-block" reverse onClick={() => this.toggle()}>
                    <CardBody cascade>
                        <Container className="" style={{ cursor: "pointer" }}>
                            <div className="add-class-icon"><Fa icon="plus-circle" /></div>
                            <CardTitle>Add New Classroom</CardTitle>
                        </Container>
                    </CardBody>
                </Card>
                <Modal
                    size="lg"
                    cascading
                    className= "modal-avatar clearMargin"                    
                    isOpen={modal}                    
                    toggle={() => this.toggle()}>
                    <div >
                        <ModalBody className="mb-1">
                   
                            <div className="create-class-modal-title">Create New Classroom</div>
                            <Input
                                label="Class Name"
                                group type="text"
                                validate error="wrong"
                                id="classRoomName"
                                name="classRoomName"
                                success="right"
                                onChange={this.handleChange}
                                value={classRoomName}
                            />
                            {
                                options && 
                                <Select
                                    defaultValue={options.filter(t => t.value === gradeId)}                                
                                    isClearable
                                    className='react-select-container'
                                    classNamePrefix='react-select'
                                    name="grade"
                                    id="grade"                                
                                    options={options}
                                    styles={divStyles.colourStyles}
                                    onChange={inputValue => {
                                        const input = inputValue === null ? '' : inputValue.value;
                                        this.setState({ gradeId: input })}}                                
                                />
                            }
                            <section>
                                <div className="create-class-modal-heading">Customize Classroom Photo</div>
                                <Dropzone accept="image/*" onDrop={this.onDrop.bind(this)}>
                                    {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, acceptedFiles, rejectedFiles }) => {
                                        let styles = {...divStyles.baseStyle}
                                        styles = isDragActive ? {...styles, ...divStyles.activeStyle} : styles
                                        styles = isDragReject ? {...styles, ...divStyles.rejectStyle} : styles                                    
                                        return (
                                            <div>
                                            {                                              
                                                files.length > 0 &&
                                                <div style={{paddingBottom:"20px"}}>
                                                    <img style={{ maxHeight:"200px" }} src={files[0].preview}></img>
                                                </div>
                                            }
                                            {
                                                <div {...getRootProps()} style={styles}>
                                                    <input {...getInputProps()} />
                                                        <div>
                                                            { isDragAccept ? 'Drag and Drop' : 'Drag and Drop' } files here...
                                                        </div>
                                                </div>
                                            }
                                            { 
                                                isDragReject && <div>Unsupported file type...</div> 
                                            }
                                            </div>
                                        )
                                    }}
                                </Dropzone>
                            </section>
                        </ModalBody>
                    </div>
                    <ModalFooter className="justify-content-center">
                        <Button className="btn" onClick={() => this.handleSubmit(this)}>
                            Submit
                            <Fa icon="sign-in" className="button-icon ml-2" />
                        </Button>
                        <Button className="btn" onClick={() => this.toggle()}>
                            Close
                            <Fa icon="close" className="button-icon ml-2" />
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
