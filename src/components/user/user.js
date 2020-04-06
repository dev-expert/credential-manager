import React from 'react';
import { userAction } from '../../actions/user.action';
import { connect } from 'react-redux';
class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [{
                name: 'Ajay Singla',
                email: 'ajay.singla@appwrk.com',
                createdAt: '27-03-2020',
                createdBy: 'Gaurav Khanna'
            },
            {
                name: 'Naresh Singla',
                email: 'naresh.singla@appwrk.com',
                createdAt: '27-03-2020',
                createdBy: 'Ajay Singla'
            },
            {
                name: 'Ajay Mehta',
                email: 'ajay.mehta@appwrk.com',
                createdAt: '27-03-2020',
                createdBy: 'Ajay Singla'
            }
            ],
            show: false
        }
    }
    componentDidMount() {
        // this.props.dispatch(userAction.getUsers());
    }

    openAddUserModal() {
        this.state.show = true;
    }

    render() {
        const { users } = this.props;
        return (
            <div className="container">
                <h1>Users</h1>
                <div className="text-right">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">  Add User
               </button>
                </div>
                <br />
                <table className="table table-bordered table=hover">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Created Date</th>
                        <th>Created By</th>
                        <th>Actions</th>
                    </tr>
                    {
                        this.bindUserList()
                    }
                </table>
                <div className="modal" id="myModal">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title">User</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>

                            <div className="modal-body">
                                <div className="form-group">
                                    <label for="name">Name:</label>
                                    <input type="text" className="form-control" id="name" />
                                </div>
                                <div className="form-group">
                                    <label for="email">Email:</label>
                                    <input type="text" className="form-control" id="email" />
                                </div>
                                <div className="form-group">
                                    <label for="password">Password:</label>
                                    <input type="password" className="form-control" id="password" />
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary">Save</button>
                                <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div >
        )
    }

    bindUserList() {
        if (this.state.users && this.state.users.length) {
            return this.state.users.map(user => {
                const { name, email, createdAt, createdBy } = user;
                return <tr>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{createdAt}</td>
                    <td>{createdBy}</td>
                    <td>
                        <button type="button" className="btn btn-warning">Edit</button>
                        <button type="button" className="btn btn-default">Delete</button>
                    </td>
                </tr>
            });
        }
    }
}
// function mapStateToProps(state) {
//     const { users } = state;
//     return {
//         users
//     };
// }

// const users = connect(mapStateToProps)(
//     UserList
// );

export default UserList;