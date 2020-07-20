import React, { Component } from 'react'
import Popup from 'reactjs-popup'
import Button from 'react-bootstrap/Button'

class TaskInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            taskName: "",
            module: "",
            timeFrom: "",
            timeTo: "",
            description: "",
            hovered: false
        }
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.editTask = this.editTask.bind(this)
        this.removeTask = this.removeTask.bind(this)
        this.reset = this.reset.bind(this)
    }

    openModal() {
        this.setState({
            open: true,
            taskName: this.props.taskInfo.taskName,
            module: this.props.taskInfo.module,
            timeFrom: this.props.taskInfo.timeFrom.length===3 ? "0"+this.props.taskInfo.timeFrom : this.props.taskInfo.timeFrom,
            timeTo: this.props.taskInfo.timeTo.length===3 ? "0"+this.props.taskInfo.timeTo : this.props.taskInfo.timeTo,
            description: this.props.taskInfo.description
        })
    }

    closeModal() {
        this.setState({open: false})
        this.reset()
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name] : value
        })
    }

    reset() {
        this.setState({
            taskName: "",
            module: "",
            timeFrom: "",
            timeTo: "",
            description: "",
        })
    }

    editTask() {
        let editedFields = {taskName: this.state.taskName, 
                            module: this.state.module, 
                            timeFrom: this.state.timeFrom, 
                            timeTo: this.state.timeTo, 
                            description: this.state.description,
                            }
        this.props.updateTask(true, editedFields)
        this.closeModal()
    }

    removeTask() {
        let removedFields = {taskName: "", 
                             module: "", 
                             timeFrom: this.state.timeFrom, 
                             timeTo: "", 
                             description: ""
                            }
        this.props.updateTask(false, removedFields)
        this.closeModal()
    }

    render() {
        const defaultButtonStyle = {   
            background: 'transparent',
            border: 0,
            width:'100%',
            height:'30px',
            color: '#a2b2d3',
            fontSize: 20
        }

        const modalStyle = {
            font: '12px',
        }
        
        const headerStyle = {
            color: 'black',
            width: '100%',
            borderBottom: '1px solid gray',
            fontSize: '18px',
            textAlign: 'center',
            padding: '5px'
        }

        const contentStyle = {
            color: 'black',
            width: '100%',
            padding: '3% 50px'
        }

        const closeStyle = {
            color: 'black',
            cursor: 'pointer',
            position: 'absolute',
            display: 'block',
            padding: '2px 5px',
            lineHeight: '20px',
            right: '-10px',
            top: '-10px',
            fontSize: '24px',
            background: '#ffffff',
            borderRadius: '18px',
            border: '1px solid #cfcece',
        }
        return (
            <div>
                {this.props.taskInfo.taskPresent ? 
                    <Button className={!this.props.taskCompleted && this.props.calendarView ? "taskButtonIncomplete" : "taskButton"} onClick={this.openModal}> {this.props.taskInfo.taskName} </Button> :
                    <button style={defaultButtonStyle}
                        onMouseOver={() => this.setState({hovered:true})}
                        onMouseLeave={() => this.setState({hovered:false})}
                        onClick={this.openModal}
                    > 
                        {this.state.hovered ? '+' : null}
                    </button>
                }
                <Popup
                    open={this.state.open}
                    closeOnDocumentClick
                    onClose={this.closeModal}
                >
                    <div style={modalStyle}>
                        <a style={closeStyle} onClick={this.closeModal}>
                            &times;
                        </a>
                        <div style={headerStyle}> {this.props.taskInfo.taskPresent ? this.props.taskInfo.taskName : "New Task"} </div>
                        <form style={contentStyle}>
                           <div style={{width:'100%'}}>
                               <div style={{float: 'left', width:'10%'}}> Task Name: </div>
                               <div style={{float:'left', marginLeft:'6%', width:'35%'}}> 
                                    <input 
                                        type='text' 
                                        name='taskName'
                                        style={{width:'100%'}}
                                        value={this.state.taskName}
                                        onChange={this.handleChange}
                                        readOnly={this.props.calendarView}
                                    >
                                    </input> 
                                </div>
                            </div>

                            <div style={{marginTop:'8%', width:'100%'}}>
                                <div style={{float: 'left', width:'10%'}}> Module: </div>
                                <div style={{float:'left', marginLeft:'6%', width:'35%'}}> 
                                    <input 
                                        type='text' 
                                        name="module"
                                        style={{width:'100%'}}
                                        value={this.state.module}
                                        onChange={this.handleChange}
                                        readOnly={this.props.calendarView}
                                    >
                                    </input> 
                                </div>
                            </div>

                            <div style={{marginTop:'16%', width:'100%'}}>
                                <div style={{float: 'left', width:'10%'}}> From: </div>
                                <div style={{float:'left', marginLeft:'6%', width:'15%'}}> 
                                    <input 
                                        type='text' 
                                        name="timeFrom"
                                        style={{width:'100%'}}
                                        value={this.state.timeFrom}
                                        readOnly={true}
                                >        
                                    </input> 
                                </div>

                                <div style={{float: 'left', marginLeft:"30%", width:'10%'}}> To: </div>
                                <div style={{float:'left', marginLeft:'6%', width:'15%'}}> 
                                    <input 
                                        type='text' 
                                        name="timeTo"
                                        style={{width:'100%'}}
                                        placeholder="24hr format"
                                        value={this.state.timeTo}
                                        onChange={this.handleChange}
                                        readOnly={this.props.calendarView}
                                    >
                                    </input> 
                                </div>
                            </div>

                            <div style={{marginTop:'25%', width:'100%'}}>
                                <div style={{float:'left', width:'45%', height:'100px'}}> 
                                    <textarea style={{height:'100%', width:'100%'}} 
                                        placeholder='Task Description' 
                                        type='text' 
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.handleChange}
                                        readOnly={this.props.calendarView}
                                    >
                                    </textarea> 
                                </div>
                                <div style={{float:'left', width:'55%', marginTop:'9%'}}>
                                    {this.props.calendarView ? <div style={{marginLeft:'13%'}}> <Button className={this.props.taskCompleted ? "btn-danger" : "btn-success"} onClick={this.props.markTaskCompleted}> {this.props.taskCompleted ? "Mark Incomplete" : "Mark Complete"} </Button> </div> 
                                                             :  <div>
                                                                    <div style={{float: 'left', marginLeft: this.props.taskInfo.taskPresent ? '30%' : '45%'}}> 
                                                                        <Button className="btn-success" variant="primary" onClick={this.editTask}> 
                                                                            {this.props.taskInfo.taskPresent ? "Save Changes" : "Add Task"} 
                                                                        </Button>
                                                                    </div>
                                                                    {this.props.taskInfo.taskPresent ? 
                                                                        <div style={{float:'left', marginLeft:'5%'}}>
                                                                            <Button className="btn-success" variant="primary" onClick={this.removeTask}>
                                                                                Remove Task
                                                                            </Button>
                                                                         </div> : null
                                                                    }
                                                                </div>
                                    }
                                </div>
                            </div>
                        </form>
                    </div>
                </Popup>
            </div>
        )
    }
}

export default TaskInput