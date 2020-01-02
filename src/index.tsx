import * as React from 'react';
import * as ReactDOM from 'react-dom';
import HiLux from './components/utils/hilux';
import { loadDefaultTheme, loadTheme } from './theme_loader2';
window.reactorTrace = false;
loadDefaultTheme();
class App extends React.Component {
  state = {
    themes: ['main', 'forest'] as string[]
  };
  constructor(props: any) {
    super(props);
  }
  componentDidMount() {
  }
  render() {
    HiLux('app', this);
    return (
      <div className='app o-centered'>
        <div className='app__header o-centered__cont'>
        </div>
        <div className='app__content o-centered__cont o-centered__cont_full'>
        </div>
        <div className='app__footer o-centered__cont'>
          <section>
            <h6 className='c-fan-head'>Available color themes:</h6>
            {this.state.themes.map(_ => <span className='app__theme-click' onClick={() => { loadTheme(_) }} key={_}>{_}</span>)}
          </section>
        </div>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('app'));
