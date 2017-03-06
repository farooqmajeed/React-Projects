const React = require('react'),
    ReactDOM = require('react-dom'),
    request = require('axios')

class Autocomplete extends React.Component{
    constructor(props){     
      super(props)
     this.state = {
         options = this.state.options,
         filteredOptions  = this.state.options,
         curretOptions = ""
     }
       this.filter = this.filter.bind(this)
       this.addOption = this.addOption.bind(this)
    }
     
     filter(event) {
         this.setState({
             curretOptions: event.target.value, filteredOptions: (this.state.options.filter(function(option, index, list) {
                 return(event.target.value === option.name.sbstr(0, event.target.value.length))
             }))
         })
     }

addOption(event) {
        let currentOption = this.state.currentOption
        request
            .post(this.props.url, { name: currentOption })
            .then(response => response.data)
            .then((body) => {
                if (!body) {
                    return console.error('Failed to save')
                }
                // this.setState({ options: [body].concat(this.state.options) }, () => {
                //     console.log("this.state.options",this.state.options)
                //     this.filter({ target: { value: currentOption } })
                // })
                // checking
            })
            .catch(error => { return console.error('Failed to save') })
    }
    render() {
        return (
            <div className="form-group">
                <input type="text"
                    onKeyUp={(event) => (event.keyCode == 13) ? this.addOption() : ''}
                    className="form-control option-name"
                    onChange={this.filter}
                    value={this.currentOption}
                    placeholder="React.js">
                </input>
                {this.state.filteredOptions.map(function (option, index, list) {
                    return <div key={option._id}>
                        <a className="btn btn-default option-list-item"
                            href={'/#/' + option.name} target="_blank">
                            #{option.name}
                        </a>
                    </div>
                })}
                {(() => {
                    if (this.state.filteredOptions.length == 0 && this.state.currentOption != '')
                        return <a className="btn btn-info option-add" onClick={this.addOption}>
                            Add #{this.state.currentOption}
                        </a>
                })()}
            </div>
        )
    }
}

module.exports = Autocomplete