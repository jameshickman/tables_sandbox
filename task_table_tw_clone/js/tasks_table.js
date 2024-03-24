Array.prototype.move = function(from,to){
    // https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
    this.splice(to,0,this.splice(from,1)[0]);
    return this;
};

class TaskTable {
    #data;
    #cb_changed = () => {};
    #el_table = null;
    #el_control_template = null;

    constructor(el, cb_change) {
        this.#el_table = el;
        this.#el_control_template = el.querySelector('template').content;
        if (typeof cb_change === 'function') this.#cb_changed = cb_change;
        document.addEventListener('click', this.#hide_tool_popups.bind(this));
    }

    set_data(d) {
        this.#data = d;
        this.#build_table();
    }

    #build_table() {
        const el_tbody = this.#el_table.querySelector('tbody');
        const buld_rows = (d, depth, parent_uid) => {
            for (let i = 0; i < d.length; i++) {
                const row_data = d[i];
                let el_row = document.createElement("tr");
                el_row.dataset.uid = row_data.uid;
                el_row.dataset.depth = depth;
                el_row.dataset.index = i;
                const el_control_cell = document.createElement("td");
                const el_tool_button = document.createElement("i");
                el_tool_button.classList.add("ri-tools-fill");
                el_tool_button.classList.add("task-list__tool-button");
                el_tool_button.addEventListener('click', this.#tool_link_clicked.bind(this));
                el_control_cell.appendChild(el_tool_button);
                el_control_cell.classList.add("task-list__control-column-cell");
                const el_name = document.createElement('span');
                el_name.innerText = row_data.name;
                const el_tools = this.#el_control_template.cloneNode(true);
                // Bind tool actions
                //el_tools.querySelector(".__bind_move_up").addEventListener('click', this.#move_up_clicked.bind(this));
                el_control_cell.appendChild(el_tools);
                el_control_cell.appendChild(el_name);
                if (row_data.hasOwnProperty("children")) {
                    const el_chevron = document.createElement("i");
                    if (row_data.expanded) {
                        el_chevron.classList.add("ri-arrow-down-wide-fill");
                    }
                    else {
                        el_chevron.classList.add("ri-arrow-right-wide-fill");
                    }
                    el_chevron.classList.add("__bind_icon");
                    el_chevron.addEventListener('click', this.#chevron_clicked.bind(this));
                    el_control_cell.appendChild(el_chevron);
                    el_control_cell.dataset.expanded = row_data.expanded;
                }
                el_control_cell.style.paddingLeft = 18 + (depth * 16) + "px";
                el_control_cell.dataset.uid = row_data.uid;
                el_control_cell.dataset.depth = depth;
                if (parent_uid !== undefined) {
                    el_control_cell.dataset.parent = parent_uid;
                    el_row.dataset.parent = parent_uid;
                }
                el_row.appendChild(el_control_cell);
                for (const cell_content of row_data.cells) {
                    const el_td = document.createElement("td");
                    if (cell_content instanceof HTMLElement) {
                        el_td.appendChild(cell_content)
                    }
                    else {
                        el_td.innerHTML = cell_content;
                    }
                    el_row.appendChild(el_td);
                }
                el_tbody.appendChild(el_row);
                if (row_data.hasOwnProperty("children")) {
                    buld_rows(row_data.children, depth + 1, row_data.uid)
                }
            }
            this.#update_expanded_sections();
        }
        
        while(el_tbody.children.length > 0) {
            el_tbody.removeChild(el.lastChild);
        }
        buld_rows(this.#data, 0);
    }

    #chevron_clicked(e) {
        const el_cell = e.currentTarget.parentElement;
        const el_icon = el_cell.querySelector(".__bind_icon");
        el_icon.classList.remove("ri-arrow-down-wide-line");
        el_icon.classList.remove("ri-arrow-right-wide-line");
        if (el_cell.dataset.expanded === 'true') {
            el_cell.dataset.expanded = false;
            el_icon.classList.add("ri-arrow-right-wide-line");
        }
        else {
            el_cell.dataset.expanded = true;
            el_icon.classList.add("ri-arrow-down-wide-line");
        }
        this.#update_expanded_sections();
    }

    #tool_link_clicked(e) {
        this.#hide_tool_popups();
        const el_tool_popup = e.currentTarget.parentNode.querySelector(".task-list__row-controls-container");
        el_tool_popup.style.visibility = "visible";
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
    }

    #hide_tool_popups() {
        const els_tools = this.#el_table.querySelectorAll(".task-list__row-controls-container");
        for (const el_tool of els_tools) {
            el_tool.style.visibility = "collapse";
        }
    }

    #update_expanded_sections() {
        const rows = this.#el_table.querySelectorAll("tbody tr");
        for (const el_row of rows) {
            el_row.style.display = "table-row";
        }
        let current = 0, expander_depth = 0;
        let show = true;
        while (current < rows.length) {
            const el_cell = rows[current].querySelector("td");
            if (parseInt(el_cell.dataset.depth) < expander_depth) {
                show = true;
            }
            if (
                show &&
                el_cell.dataset.hasOwnProperty("expanded") &&
                el_cell.dataset.expanded === 'false'
            ) {
                expander_depth = parseInt(el_cell.dataset.depth) + 1;
                current += 1;
                show = false;
            }
            
            if (!show) {
                rows[current].style.display = "none";
            }
            current += 1;
        }
    }


/*
    #move_up_clicked(e) {
        const walk_back = (insert_point) => {
            while (insert_point >= 0 && parseInt(els_rows[insert_point].dataset.depth) > depth) {
                insert_point--;
            }
            return insert_point;
        }
        const move_block_of_rows = (els_rows, els_to_move, to_index) => {
            els_rows[to_index].before(els_to_move[0]);
            for (let i = 1; i < els_to_move.length; i++) {
                els_to_move[0].after(els_to_move[i]);
                to_index++;
            }
        }
        this.#hide_tool_popups();
        const els_rows = this.#el_table.querySelectorAll("tbody tr");
        const el_row = e.currentTarget.parentElement.parentElement.parentElement;
        const depth = parseInt(el_row.dataset.depth);
        const els_rows_block = this.#find_rows_block(el_row);
        let row_index = this.#find_my_index(el_row);
        if (row_index === 0) return;
        move_block_of_rows(els_rows, els_rows_block, walk_back(row_index - 1));
    }

    #move_down_clicked(e) {

    }

    #find_rows_block(el_row) {
        /*
         * Pass a ref to a row.
         * Loop down the table while the depth of the next row is deeper than the selected row.
         * Return an array of contigus rows that are children of the selected row.
         
        const depth = el_row.dataset.depth;
        const els_rows = this.#el_table.querySelectorAll("tbody tr");
        const row_block = [el_row];
        let current_row = this.#find_my_index(el_row) + 1;
        if (current_row > els_rows.length - 1) current_row = els_rows.length - 1;
        if (parseInt(els_rows[current_row].dataset.depth) > depth) {
            while(current_row < els_rows.length && parseInt(els_rows[current_row].dataset.depth) > depth) {
                row_block.push(els_rows[current_row]);
                current_row += 1;
            }
        }
        return row_block;
    }

    #find_my_index(node) {
        return Array.prototype.indexOf.call(node.parentNode.childNodes, node);
    }
    */
}