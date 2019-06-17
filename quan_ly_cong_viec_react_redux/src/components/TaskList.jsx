import React, { Component } from 'react';
import TaskItem from './TaskItem';
import '../App.css';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import _ from 'lodash';

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: "",
            filterStatus: -1    // all: -1; active: 1; deactive: 0
        }
    }
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type === "checkbox" ? target.checked : target.value;
        var filter = {
            name: name === "filterName" ? value : this.state.filterName,
            status: name === "filterStatus" ? value : this.state.filterStatus
        };
        this.props.onFilterTable(filter);
        this.setState({
            [name]: value
        });
    }
    render() {
        var { tasks, filterTable, keyword, sort } = this.props
        if (filterTable) {
            if (filterTable.name) {
                tasks = _.filter(tasks, (task) => {
                    return task.name.toLowerCase().indexOf(filterTable.name) !== -1;
                });
                tasks = _.filter(tasks, (task) => {
                    return task.name.toLowerCase().indexOf(filterTable.name) !== -1;
                })
            }
            tasks = _.filter(tasks, (task) => {
                if (filterTable.status === -1) {
                    return task;
                } else {
                    return task.status === (filterTable.status === 1 ? true : false)
                }
            });
        }
        if(keyword){
			tasks=tasks.filter((task)=>{
				return task.name.toLowerCase().indexOf(keyword)!==-1
			});
        }
        if(sort.by==="name"){
			tasks.sort((a,b)=>{
				if (a.name>b.name) return sort.value;
				else if(a.name<b.name) return -sort.value;
				else return 0;
			})
		}else{
			tasks.sort((a,b)=>{
				if (a.status>b.status) return -sort.value;	// Sort tăng dần
				else if(a.status<b.status) return sort.value;
				else return 0;
			})
		}
        var elements = tasks.map((task, index) => {  // (1)
            return <TaskItem key={task.id}
                index={index}
                task={task}
            />
        })
        return (
            <table className="table table-striped table-inverse table-responsive mt-15">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Trạng Thái</th>
                        <th className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-center pt-5">NA</td>
                        <td>
                            <input type="text" className="form-control"
                                name="filterName"
                                value={this.state.filterName}
                                onChange={this.onChange} />
                        </td>
                        <td>
                            <select name="filterStatus"
                                className="form-control"
                                value={this.state.filterStatus}
                                onChange={this.onChange}>
                                <option value={-1}>Tất Cả</option>
                                <option value={0}>Ẩn</option>
                                <option value={1}>Kích Hoạt</option>
                            </select>
                        </td>
                        <td className="text-center pt-5">NA</td>
                    </tr>
                    {elements}
                </tbody>
            </table>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        filterTable: state.filterTable,
        keyword: state.searchTask,
        sort: state.sortTask
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilterTable: (filter) => {
            dispatch(actions.filterTask(filter));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);