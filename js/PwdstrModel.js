import ComponentModel from 'core/js/models/componentModel';

class PwdstrModel extends ComponentModel {
  initialize(...args) {
    super.initialize(...args);
  }

  get _shouldResetOnRevisit() { return this.get('_isResetOnRevisit'); }
  get _isComplete() { return this.get('_isComplete'); }
}

export default PwdstrModel;
