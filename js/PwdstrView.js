import ComponentView from 'core/js/models/componentView';
import ReactDOM from 'react-dom';

class PwdstrView extends ComponentView {
  initialize(...args) {
    super.initialize(...args);
  }

  preRender() {
    this.checkIfResetOnRevisit();
  }

  postRender() {
    this.setReadyStatus(); // set component ready whn rendered
  }

  checkIfResetOnRevisit() {
    const isResetOnRevisit = this.model.get('_isResetOnRevisit');
    if (isResetOnRevisit) { // If reset is enabled set defaults
      this.model.reset(isResetOnRevisit);
    }
  }

  remove() {
    const container = this.$('.pwdstr__container')[0];
    if (container) {
      ReactDOM.unmountComponentAtNode(container);
    }
    super.remove();
  }
}

PwdstrView.template = 'adapt-pwdstr.jsx';

export default PwdstrView;