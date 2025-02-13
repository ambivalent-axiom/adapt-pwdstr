import ComponentModel from 'core/js/models/componentModel';
import notify from 'core/js/notify';

class PwdstrModel extends ComponentModel {
  initialize(...args) {
    super.initialize(...args);
    this.setupAspects();
  }

  setupAspects() {
    const aspects = this.get('_pwdstr').aspects;
    this._maxScore = aspects.reduce( // need this to compare to in template
      (sum, aspect) => sum + aspect.score, 0
    );
  }

  onChallangeComplete(score) {
    this.set({
      _score: score, // points will be calculated in template dynamically
      _isComplete: true,
      _isInteractionComplete: true
    });

    this.setCompletionStatus();

    const feedback = this.get('_feedback');
    if (feedback?._isEnabled) {
      notify.popup({
        title: feedback.complete.title,
        body: feedback.complete.body
      });
    }
    this.trigger('complete'); // Trigger completion event
  }

  reset() {
    this.set({
      _isComplete: false,
      _score: 0
    });
    this.trigger('reset'); // Trigger reset event for view
  }

  get _shouldResetOnRevisit() { return this.get('_isResetOnRevisit'); }
  get _isComplete() { return this.get('_isComplete'); }
}

export default PwdstrModel;
