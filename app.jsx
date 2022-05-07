class TodoItems extends React.Component {
  constructor(props) {
    super(props);
    this.createTasks = this.createTasks.bind(this);
  }
  del(key) {
    this.props.delete(key);
  }

  createTasks(item) {
    return (
      <li onClick={this.del.bind(this, item.key)} key={item.key}>
        {item.text}
      </li>
    );
  }

  render() {
    this.listItems = this.props.entries.map(this.createTasks);

    return <ul className="theList">{this.listItems}</ul>;
  }
}

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", items: [] };

    this.handleChange = this.handleChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);

    this.input = React.createRef();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  addItem(event) {
    event.preventDefault();
    if (this.state.value !== "") {
      this.newItem = {
        text: this.state.value,
        key: Date.now(),
      };
      this.setState((prevState) => ({
        items: prevState.items.concat(this.newItem),
      }));
      this.setState({ value: "" });
    }
    this.input.current.focus();
  }



  deleteItem(key) {
    this.filteredItems = this.state.items.filter(function (item) {
      return item.key !== key;
    });

    this.setState({
      items: this.filteredItems,
    });
    this.input.current.focus();
  }

  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <h1 className="texto">Mis tareas</h1>
          <form onSubmit={this.addItem}>
            <input
              placeholder="introduce una tarea"
              value={this.state.value}
              onChange={this.handleChange}
              ref={this.input}
            ></input>
            <button type="submit">añadir</button>
            <p className="texto">
              Una vez ultimada la tarea, eliminala clicando en ella
            </p>
          </form>
        </div>
        <div className="todoitems">
          <TodoItems entries={this.state.items} delete={this.deleteItem} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<TodoList />, document.getElementById("root"));
