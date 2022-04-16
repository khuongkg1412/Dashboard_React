import axios from 'axios'
import React, { useCallback, useMemo } from 'react'

import DataTable from "react-data-table-component";
import FilterComponent from "../../component/Filter/FilterComponent";
import Switch from "@mui/material/Switch"
import FormControlLabel from "@mui/material/FormControlLabel"



const Table = props => {
    var check = localStorage.getItem("curent_Session");

    const changeStatus = useCallback((email, status) => {
        return async (e) => {
            if (status === 1) {
                axios.put("http://localhost:3001/adminManagement/disable/" + email).then(res => {
                    if (res.data === true) {
                        alert("Disable success");
                        window.location.reload(false);
                    } else {
                        alert("Disable fail");
                        window.location.reload(false);
                    }
                });
            } else {
                axios.put("http://localhost:3001/adminManagement/enable/" + email).then(res => {
                    if (res.data === true) {
                        alert("Enable success");
                        window.location.reload(false);
                    } else {
                        alert("Enable fail");
                        window.location.reload(false);
                    }
                });
            }
        }
    });

    const columns = [
        {
            name: "Avatar",
            selector: (row) => row.Avatar,
            cell: (row) => (
                <div className="card-body text-center">
                    {
                        <img width="80px" height="80px" src={row.Avatar} alt="display image" />
                    }
                </div>
            ),
            center: true
        },
        {
            name: "User name",
            selector: (row) => row.Username,
            sortable: true,
            center: true
        },
        {
            name: "Email",
            selector: (row) => row.Email,
            sortable: true,
            center: true
        },
        {
            name: "Phone",
            selector: (row) => row.Phone,
            center: true
        },
        {
            name: "Status",
            selector: (row) => row.Status,
            cell: (row) => (
                <div className="card-body text-center">
                    {
                        check == "khuongnvce140417@fpt.edu.vn"
                            ? (row.Status === 1
                                ? <FormControlLabel control={<Switch defaultChecked onClick={changeStatus(row.Email, row.Status)} />} label="Enable" />
                                : <FormControlLabel control={<Switch defaultChecked onClick={changeStatus(row.Email, row.Status)} />} label="Disable" />)
                            : null
                    }
                </div>
            ),
            center: true

        }
    ];

    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    
    const filteredItems = props.data.filter(
        item =>
            JSON.stringify(item)
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) !== -1
    );

    const subHeaderComponent = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText("");
            }
        };

        return (
            <FilterComponent
                onFilter={e => setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
            />
        );
    }, [filterText, resetPaginationToggle]);

    return (
        <DataTable
            columns={columns}
            data={filteredItems}
            defaultSortField="User name"
            striped
            pagination
            subHeader
            subHeaderComponent={subHeaderComponent}
        />
    );
};

export default Table;