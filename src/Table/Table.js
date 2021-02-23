import React from 'react';

const Table = ({data, sort, sortField, onSort, onRowSelect}) => {

    return (
        <table className="table">
            <thead>
            <tr>
                <th onClick={() => onSort('id')}>ID {sortField === 'id' ? <small>{sort}</small> : null}</th>
                <th onClick={() => onSort('firstName')}>First Name {sortField === 'firstName' ? <small>{sort}</small> : null}</th>
                <th onClick={() => onSort('lastName')}>Last Name {sortField === 'lastName' ? <small>{sort}</small> : null}</th>
                <th onClick={() => onSort('email')}>Email {sortField === 'email' ? <small>{sort}</small> : null}</th>
                <th onClick={() => onSort('phone')}>Phone {sortField === 'phone' ? <small>{sort}</small> : null}</th>
            </tr>
            </thead>
            <tbody>
            {data.map(item => (
                <tr key={item.id + item.phone} onClick={() => onRowSelect(item)}>
                    <td>{item.id}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default Table;