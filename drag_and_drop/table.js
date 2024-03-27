function setup_table(
    el_table,
    fn_changed
) {
    function getChildElementIndex(node) {
        return Array.prototype.indexOf.call(node.parentNode.children, node);
    }

    let row = null, index_from = 0, index_to = 0;

    const els_rows = el_table.querySelectorAll("tr");

    for (const el_row of els_rows) {
        el_row.addEventListener('dragstart', (e) => {
            row = e.target;
            index_from = getChildElementIndex(row);
        });

        el_row.addEventListener('dragover', (e) => {
            e.preventDefault();
            let children = Array.from(e.target.parentNode.parentNode.children);
            if(children.indexOf(e.target.parentNode)>children.indexOf(row)) {
                e.target.parentNode.after(row);
            }
            else {
                e.target.parentNode.before(row);
            }
            index_to = getChildElementIndex(row);
        });

        el_row.addEventListener('dragend', (e) => {
            if (typeof fn_changed == "function") fn_changed(e.currentTarget, index_from, index_to);
        });
    }
}