import React, { Component } from "react";
import Timetable from './components/Timetable'
import Button from 'react-bootstrap/Button'
import moduleslist from './api/moduleslist.json'
import AutoComplete from './components/AutoComplete'
import nusmodsAPI from './api/nusmodsAPI'
import AutomatedScheduler from './components/AutomatedScheduler'
import Deadline from './components/Deadline'
import ImportInput from './components/ImportInput'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            weekNum: this.props.currWeek,
            timetables: this.props.initHome
        }
        this.navWeek = this.navWeek.bind(this)
        this.updateHomeTask = this.updateHomeTask.bind(this)
        this.updateHomeDeadline = this.updateHomeDeadline.bind(this)
        this.submitURL = this.submitURL.bind(this)
    }

    updateHomeTask(id, updatedTimetable) {
        this.props.updateTaskDatabase(id, updatedTimetable)
    }

    updateHomeDeadline(id, updatedDeadline) {
        this.props.updateDLDatabase(id, updatedDeadline)
    }

    submitURL(url) {
        this.props.submitURL(url, this.state.weekNum)
    }

    navWeek(diff) {
        // allow user to navigate between week 1 and 13
        this.setState(prevState => {
            if (prevState.weekNum===1 && diff===-1) {
                return {weekNum: prevState.weekNum}
            } else if (prevState.weekNum===13 && diff===1) {
                return {weekNum: prevState.weekNum}
            } else {
                return {weekNum: prevState.weekNum+diff}
            }
        })
    }

    render() {
        let tasksAdded = new Map()
        if (this.state.timetables.has(this.state.weekNum)) {
            tasksAdded = this.state.timetables.get(this.state.weekNum)
        }
        return (
            <React.Fragment>
                <div style={{marginTop:'2%', marginLeft:'40%', paddingBottom:'1.5%'}}> 
                    <Button variant="outline-dark" style={{float:'left', marginRight:"5%"}} onClick={()=>this.navWeek(-1)}> {'<'} </Button>
                    <h3 style={{float:'left', color:'#404040'}}> {'Week ' + this.state.weekNum} </h3> 
                    <Button variant="outline-dark" style={{float:'left', marginLeft:"5%"}} onClick={()=>this.navWeek(1)}> {'>'} </Button>
                </div>
                <div style={{position:'absolute', marginLeft:'83%'}}> 
                    <ImportInput submitURL={this.submitURL}/>
                </div>
                <div style={{marginLeft:'13%', marginTop:'3%'}}>
                    <div style={{float:'left'}}> <Timetable id={this.state.weekNum} tasksAdded={tasksAdded} updateHomeTask={this.updateHomeTask}/> </div>
                    <div style={{float:'right', marginRight:'0.8%'}}> <Deadline updateHomeDeadline={this.updateHomeDeadline}/> </div>
                </div>
                <div style={{position:'absolute', marginTop:'32.9%', marginLeft:'13.1%'}}>
                    <AutomatedScheduler />
                </div>
            </React.Fragment>
        )
    }
}

export default Home