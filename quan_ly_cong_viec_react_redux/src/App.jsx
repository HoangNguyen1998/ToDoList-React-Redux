import React, { Component } from 'react';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import './App.css';
import _ from "lodash";
import {connect} from 'react-redux';
import * as actions from './actions/index';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filter:{
				name: "",
				status: -1
			},
			keyword:"",
			sortBy:"name",
			sortValue: 1
		}
	}
	onToggleForm=()=>{
		var taskEdit=this.props.taskEdit;
		if(taskEdit&&taskEdit.id!==""){
			this.props.onOpenForm();
		}else{
		this.props.onToggleForm();
		}
		this.props.onClearTask({
			id: "",
			name: "",
			status: false
		});
	}	
	render() {		
		var {isDisplayForm}=this.props;	
		// Kiểm tra điều kiện nếu isDisplayForm = true thì sẽ đổ component TaskForm ra elmTaskForm
		var elmTaskForm = isDisplayForm ? <TaskForm/>:""
		return (
			<div className="container">
				<div className="text-center">
					<h1>Quản Lý Công Việc</h1><hr />
				</div>
				<div className="row">
					<div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
						{elmTaskForm}
					</div>
					<div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
						<button type="button"
							className="btn btn-primary"
							onClick={this.onToggleForm}>
							<span className="fa fa-plus mr-5"></span>Thêm Công Việc
						</button>&nbsp;
						{/*	tìm kiếm và sắp xếp	*/}
						<Control/>
						{/*list*/}
						<TaskList/>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps=state=>{
	return {
		isDisplayForm: state.isDisplayForm,
		taskEdit: state.taskEdit.task
	};
};
const mapDispatchToProps=(dispatch,props)=>{
	return {onToggleForm:()=>{
		dispatch(actions.toggleForm())
	},
	onClearTask:(task)=>{
		dispatch(actions.editTask(task));
	},
	onOpenForm:()=>{
		dispatch(actions.openForm());
	}
};
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
