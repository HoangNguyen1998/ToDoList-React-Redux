import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux';
import * as actions from '../actions/index'

class TaskItem extends Component {
    onUpdateStatus=()=>{
        this.props.onUpdateStatus(this.props.task.id);
    }
    onDelete=()=>{
        this.props.onDelete(this.props.task.id);
        this.props.onCloseForm();
    }
    onEditTask=()=>{
        this.props.onOpenForm();
        this.props.onEditTask(this.props.task);
    }
    render() {
        // Khai báo task và index để hứng giá trị được truyền vào từ component TaskList 
        var {task, index}=this.props;
        return (
                <tr>
                    <td className="text-center pt-5">{index}</td>
                    <td className="text-center pt-5">{task.name}</td>
                    <td className="text-center pt-5"><span className={task.status===true?"label label-success":"label label-danger"}
                    onClick={this.onUpdateStatus}>{task.status===true?"Kích Hoạt":"Ẩn"}</span></td>
                    <td className="text-center">
                        <button type="button" className="btn btn-warning" onClick={this.onEditTask}>
                            <i className="fas fa-pencil-alt mr-5"></i>Sửa
						</button>
                        &nbsp;
							<button type="button" className="btn btn-danger" onClick={this.onDelete}>
                            <i className="fas fa-trash-alt mr-5"></i>Xóa
							</button>
                    </td>
                </tr>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        
    }
}

const mapDispatchToProps=(dispatch, props)=>{
    return { 
        onUpdateStatus:id=>{
            dispatch(actions.updateStatus(id));
        }, 
        onDelete:id=>{
            dispatch(actions.deleteTask(id));
        },
        onCloseForm:()=>{
			dispatch(actions.closeForm());
        },
        onOpenForm:()=>{
            dispatch(actions.openForm());
        },
        onEditTask:(task)=>{
            dispatch(actions.editTask(task));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);