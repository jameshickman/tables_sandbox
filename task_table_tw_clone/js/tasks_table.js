Array.prototype.move = function(from,to){
    // https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
    this.splice(to,0,this.splice(from,1)[0]);
    return this;
};

class TaskTable {
    #data;
    #cb_changed = () => {};
    #cb_edit = () => {};
    #cb_add = () => {};
    #cb_add_child = () => {};
    #cb_delete = () => {};
    #el_table = null;
    #el_control_template = null;

    /**
     * Constructer
     * @param {HTMLElement}} el The table
     * @param {CallableFunction} cb_change Called on changing the row ordering
     */
    constructor(el, cb_change) {
        this.#el_table = el;
        this.#el_control_template = el.querySelector('template').content;
        if (typeof cb_change === 'function') this.#cb_changed = cb_change;
        document.addEventListener('click', this.#hide_tool_popups.bind(this));
    }

    /**
     * Set the data in the table
     * @param {Array<Object>} d See examples
     */
    set_data(d) {
        this.#data = d;
        this.#build_table();
        return this;
    }

    /**
     * Refresh the desplay from the data.
     * Call after altering the data to display it.
     */
    reload() {
        this.#build_table();
        return this;
    }

    /**
     * Set the tool action callbacks
     * 
     * @param {CallableFunction} cb_edit 
     * @param {CallableFunction} cb_add 
     * @param {CallableFunction} cb_add_child 
     * @param {CallableFunction} cb_delete 
     */
    set_callbacks(cb_edit, cb_add, cb_add_child, cb_delete) {
        this.#cb_edit = cb_edit;
        this.#cb_add = cb_add;
        this.#cb_add_child = cb_add_child;
        this.#cb_delete = cb_delete;
        return this;
    }

    /**
     * Find the data object by row UUID
     * 
     * @param {string} uid 
     * @returns Refrance to the object that contans the row data
     */
    find_by_uid(uid) {
        const scan = (d) => {
            for (let i = 0; i < d.length; i++) {
                if (d[i].uid === uid) {
                    return [d, i];
                }
                if (d[i].hasOwnProperty("children")) {
                    const res = scan(d[i].children);
                    if (res !== false) return res;
                }
            }
            return false;
        }
        return scan(this.#data);
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
                el_tools.querySelector(".__bind_move_up").addEventListener('click', this.#move_up_clicked.bind(this));
                el_tools.querySelector(".__bind_move_down").addEventListener('click', this.#move_down_clicked.bind(this));
                el_tools.querySelector(".__bind_edit").addEventListener('click', (e) => {
                    this.#cb_edit(e.currentTarget.parentElement.parentElement.dataset['uid']);
                });
                el_tools.querySelector(".__bind_add_row").addEventListener('click', (e) => {
                    this.#cb_add(e.currentTarget.parentElement.parentElement.dataset['uid']);
                });
                el_tools.querySelector(".__bind_child_row").addEventListener('click', (e) => {
                    this.#cb_add_child(e.currentTarget.parentElement.parentElement.dataset['uid']);
                });
                el_tools.querySelector(".__bind_delete").addEventListener('click', (e) => {
                    this.#cb_delete(e.currentTarget.parentElement.parentElement.dataset['uid']);
                });
                el_control_cell.appendChild(el_tools);
                el_control_cell.appendChild(el_name);
                if (row_data.hasOwnProperty("children")) {
                    const el_chevron = document.createElement("i");
                    if (row_data.expanded) {
                        el_chevron.classList.add("ri-arrow-down-wide-line");
                    }
                    else {
                        el_chevron.classList.add("ri-arrow-right-wide-line");
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
            el_tbody.removeChild(el_tbody.lastChild);
        }
        buld_rows(this.#data, 0);
    }

    #chevron_clicked(e) {
        const row_uid = e.currentTarget.parentElement.parentElement.dataset.uid;
        const found_in = this.find_by_uid(row_uid);
        const el_cell = e.currentTarget.parentElement;
        const el_icon = el_cell.querySelector(".__bind_icon");
        el_icon.classList.remove("ri-arrow-down-wide-line");
        el_icon.classList.remove("ri-arrow-right-wide-line");
        if (el_cell.dataset.expanded === 'true') {
            el_cell.dataset.expanded = false;
            found_in[0][found_in[1]].expanded = false;
            el_icon.classList.add("ri-arrow-right-wide-line");
        }
        else {
            el_cell.dataset.expanded = true;
            found_in[0][found_in[1]].expanded = true;
            el_icon.classList.add("ri-arrow-down-wide-line");
        }
        this.#update_expanded_sections();
        this.#cb_changed({"action": "expanders"});
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

    #move_up_clicked(e) {
        const row_uid = e.currentTarget.parentElement.parentElement.dataset.uid;
        this.#move(row_uid, -1);
    }

    #move_down_clicked(e) {
        const row_uid = e.currentTarget.parentElement.parentElement.dataset.uid;
        this.#move(row_uid, 1);
    }

    #move(row_uid, move_by) {
        this.#hide_tool_popups();
        const found_in = this.find_by_uid(row_uid);
        if (move_by < 0 && found_in[1] <= 0) return;
        if (move_by > 0 && found_in[1] >= found_in[0].length - 1) return;
        found_in[0].move(found_in[1], found_in[1] + move_by);
        this.#build_table();
        this.#cb_changed({"action": "move"});
    }
}