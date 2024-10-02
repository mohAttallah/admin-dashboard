import React, { useState, useEffect, useRef } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Menu,  TextField  } from '@mui/material';

const itemsPerPage = 5; 
const mockData = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    name: `Item ${index + 1}`,
}));

const InfiniteScrollSelect = () => {
    const [selectedItem, setSelectedItem] = useState('');
    const [currentItems, setCurrentItems] = useState([]);
    const [page, setPage] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const anchorRef = useRef(null); 

    const loadMoreItems = () => {
        const nextItems = mockData.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
        setCurrentItems((prevItems) => [...prevItems, ...nextItems]);
        setPage((prevPage) => prevPage + 1);
    };

    const handleSelectChange = (event) => {
        setSelectedItem(event.target.value);
        setMenuOpen(false); 
    };

    const handleMenuOpen = () => {
        setMenuOpen(true);
        loadMoreItems(); 
    };

    const handleScroll = (event) => {
        const bottom = event.target.scrollHeight === event.target.scrollTop + event.target.clientHeight;
        if (bottom) {
            loadMoreItems(); 
        }
    };

    useEffect(() => {
        if (menuOpen) {
            setCurrentItems([]);
            setPage(0);
        }
    }, [menuOpen]);

    return (
        <FormControl fullWidth>
            <InputLabel id="select-label">Select Item</InputLabel>
            <Select
                labelId="select-label"
                value={selectedItem}
                onChange={handleSelectChange}
                onOpen={handleMenuOpen}
                onClose={() => setMenuOpen(false)}
                inputRef={anchorRef}
            >
                <Menu
                    open={menuOpen}
                    onScroll={handleScroll}
                    anchorEl={anchorRef.current}
                    onClose={() => setMenuOpen(false)}
                    MenuListProps={{
                        onScroll: handleScroll,
                        style: { maxHeight: 200, overflowY: 'auto' },
                    }}
                >
                    {currentItems.map(item => (
                        <MenuItem key={item.id} value={item.name}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Menu>
            </Select>
        </FormControl>
    );
};

export default InfiniteScrollSelect;
