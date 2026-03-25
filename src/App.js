import React, { useState } from "react";
import usersData from "./data";

function App() {
  const [users, setUsers] = useState(usersData);
  const [search, setSearch] = useState("");
  const filteredUsers = users.filter(
  (user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
);
const [sortField, setSortField] = useState("");
const [sortOrder, setSortOrder] = useState("asc");
const sortedUsers = [...filteredUsers].sort((a, b) => {
  if (!sortField) return 0;

  let valA =
    sortField === "company" ? a.company.name : a[sortField];
  let valB =
    sortField === "company" ? b.company.name : b[sortField];

  return sortOrder === "asc"
    ? valA.localeCompare(valB)
    : valB.localeCompare(valA);
});
const [selectedUser, setSelectedUser] = useState(null);

if (selectedUser) {
  return (
    <div style={{ textAlign: "center" }}>

      <button onClick={() => setSelectedUser(null)}>Back</button>

      <h2>{selectedUser.name}</h2>
      <p>Email: {selectedUser.email}</p>
      <p>Phone: {selectedUser.phone}</p>
      <p>Company: {selectedUser.company.name}</p>
      <p>City: {selectedUser.address.city}</p>
    </div>
  );
}
const thStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  cursor: "pointer"
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "10px"
};
  return (
    <div>
      <h1
          style={{
          textAlign: "center",
           marginBottom: "20px"
          }}>User Directory Dashboard</h1>
       <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        autoComplete="off"
       style={{
       padding: "10px",
       width: "300px",
       borderRadius: "5px",
       border: "1px solid #ccc",
       marginLeft:"510px"
        }}
/>
      <table style={{
  borderCollapse: "collapse",
  width: "100%",
  marginTop: "20px"
}}>

      <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={thStyle} 
              onClick={() => {
              if (sortField === "name"){
               setSortOrder(sortOrder === "asc" ? "desc" : "asc");
              }
              else{
                 setSortField("name");
                 setSortOrder("asc");
              }
              }}>
                Name {sortField === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
               </th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Phone</th>
            <th style={thStyle} 
            onClick={() => {
                if (sortField === "company"){
               setSortOrder(sortOrder === "asc" ? "desc" : "asc");
              }
                 else{
                 setSortField("company");
                 setSortOrder("asc");
              }
              }}>
            Company {sortField === "company" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
        </tr>
      </thead>
       <tbody>
            {sortedUsers.map((user) => (
           <tr
             key={user.id}
             onClick={() => setSelectedUser(user)}
             style={{
            cursor: "pointer",
              textAlign: "center"
             }}
          onMouseOver={(e) => e.currentTarget.style.background = "#f5f5f5"}
          onMouseOut={(e) => e.currentTarget.style.background = "white"}
>
        <td style={tdStyle}>{user.name}</td>
        <td style={tdStyle}>{user.email}</td>
        <td style={tdStyle}>{user.phone}</td>
        <td style={tdStyle}>{user.company.name}</td>
      </tr>
    ))}
  </tbody>
    </table>


    </div>
  );
}

export default App;

