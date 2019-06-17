import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux';
import * as actions from '../actions/index';

class TaskForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id:"",
			name:"",
			status:false
		}
	}
	componentWillMount() {
		if (this.props.taskEdit.task) {
			this.setState({
				id: this.props.taskEdit.task.id,
				name: this.props.taskEdit.task.name,
				status: this.props.taskEdit.task.status
			});
		} else{
			this.onClear();
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps && nextProps.taskEdit) {
			this.setState({
				id: nextProps.taskEdit.task.id,
				name: nextProps.taskEdit.task.name,
				status: nextProps.taskEdit.task.status
			});
		} else if (nextProps && nextProps.task === null) {
			this.setState({
				id: "",
				name: "",
				status: false
			})
		}
	}
	closeForm = () => {
		this.props.onCloseForm();
	}
	onChange = (event) => {
		// Khai báo target bằng event.target(hướng nó đến từng giá trị của mỗi ô input)
		var target = event.target;
		// Khai báo name vì mỗi ô input sẽ có một cái name khác nhau
		var name = target.name;
		var value = target.value;
		// Chuyển từ string sang dạng boolean
		if (name === "status") {
			value = target.value === "true" ? true : false;
		}
		this.setState({
			[name]: value
		})
	}
	onSubmit = (event) => {
		event.preventDefault();
		this.props.onSaveTask(this.state);
		// Huy bo va dong form
		this.onClear();
		this.props.onCloseForm();
	}
	onClear = () => {
		this.setState({
			name: "",
			status: false
		})
	}
	render() {
		var { id } = this.state;
		if(!this.props.isDisplayForm) return "";
		return (
			<div className="panel panel-warning">
				<div className="panel-heading">
					<h3 className="panel-title">{id !== "" ? "Cập Nhật Công Việc" : "Thêm Công Việc"}<span className="fa fa-times-circle text-right"
						role="button" onClick={this.closeForm}></span> </h3>
				</div>
				<div className="panel-body">
					<form onSubmit={this.onSubmit}>
						<div className="form-group">
							<label>Tên:</label>
							<input type="text" className="form-control" name="name"
								value={this.state.name}
								onChange={this.onChange} />
						</div>
						<label>Trạng Thái: </label>
						<select name="status" className="form-control mb-5" value={this.state.status}
							onChange={this.onChange}>
							<option value={true}>Kích hoạt</option>
							<option value={false}>Ẩn</option>
						</select>
						<div className="text-center">
						<button type="submit" className="btn btn-primary"><span className="fa fa-plus mr-5"></span>Lưu Lại</button>&emsp;
						<button type="button" className="btn btn-danger" onClick={this.onClear}><span className="fa fa-times-circle mr-5"></span>Hủy Bỏ</button>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

const mapStateToProps=state=>{
	return{
		isDisplayForm: state.isDisplayForm,
		taskEdit:state.taskEdit
	}
};
const mapDispatchToProps=(dispatch, props)=>{
	return{
		onSaveTask:(task)=>{
			dispatch(actions.saveTask(task));
		},
		onCloseForm:()=>{
			dispatch(actions.closeForm());
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);

// chia sẻ học lập trình react 
