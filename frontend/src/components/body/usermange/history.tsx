import * as React from 'react';
import { jwtDecode } from 'jwt-decode';
import Axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { createTheme, ThemeProvider } from '@mui/material';

interface Column {
    id: 'action' | 'from' | 'to' | 'amount' | 'time';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'action', label: 'Action', minWidth: 170 },
    { id: 'from', label: 'From', minWidth: 100 },
    {
        id: 'to',
        label: 'To',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'amount',
        label: 'Amount',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'time',
        label: 'Time',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
];

interface Data {
    name: string;
    code: string;
    population: number;
    size: number;
    density: number;
}

const Theme = createTheme({
    palette: {
        background: {
            default: 'white',
        }
    }
})


export default function ColumnGroupingTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [flg, setFlg] = React.useState(false)
    const [rows, setRows] = React.useState([])
    const [id, setId] = React.useState("");

    React.useEffect(() => {
        const currentUser = localStorage.getItem("currentUser");
        if (currentUser) {
            const user = Object(jwtDecode(String(currentUser)));
            setId(user.id);
            if (id) {
                Axios.post('http://localhost:4128/router/api/walletHistory', { userId: id })
                    .then(res => {
                        const data = res.data.result;
                        setRows(data);
                    })
                    .catch(error => console.error(error))
            }
        }
    }, [flg])

    React.useEffect(() => {
        setFlg(true)
    })

    React.useEffect(() => {
        console.log(rows);
    }, [rows])

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <ThemeProvider theme={Theme}>
            <Paper sx={{ width: '100%', height: "100vh"}}>
                <TableContainer sx={{maxHeight: "99vh"}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={2} sx={{fontSize: "23px"}}>
                                    <strong>Wallet History</strong>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ top: 57, minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} >
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </ThemeProvider>
    );
}