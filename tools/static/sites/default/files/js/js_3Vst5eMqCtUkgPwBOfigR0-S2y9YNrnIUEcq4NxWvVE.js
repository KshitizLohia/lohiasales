(function ($) {
    Drupal.behaviors.sunrun_leadforms = {
        attach: function (context, settings) {

            if(typeof(MktoForms2) !== 'undefined')
            {
                MktoForms2.loadForm(settings.sunrun_leadforms.environment, settings.sunrun_leadforms.munchkin_id, settings.sunrun_leadforms.form_id, function (form)
                {
                    //form manipulation
                    switch(settings.sunrun_leadforms.form)
                    {
                        case 'get-quote':
                            break;

                        case 'standard-leadform':
                            //hide the marketo postal code field in lieu of the custom field
                            //$('#PostalCode').closest('.mktoFormRow').addClass('hide');
                            //$('#Average_Monthly_Electric_Bill__c').closest('.mktoFormRow').addClass('hide');
                            $('#Average_Monthly_Electric_Bill__c').closest('.mktoFormRow').addClass('monthly-bill');
                            $('select').addClass('form-control');

                            //update the form value of the PostalCode if the default was changed.
                            $('.zip').on('change', function() {
                                form.vals({"PostalCode": $('.zip').val()});
                            });
                            $('.bill').on('change', function() {
                                form.vals({"Average_Monthly_Electric_Bill__c": $('.bill').val()});
                            });

                            $('#Referral_web_form__c').closest('.mktoCheckboxList').find('label').text('I was referred to Sunrun by a friend or family member');

                            // Google Analitycs event
                            ga('send', 'event', 'quote form', 'view (step 1) ', settings.sunrun_tracking.full_url, '', {'nonInteraction': 1});

                            break;

                        case 'referral-form':
                            $('#I_m_Already__c').closest('.mktoCheckboxList').find('label').text('I\'m a Customer');
                            break;

                        case 'soft-signup':
                            break;

                        case 'standard-leadform-bestbuy':
                        case 'standard-leadform-costco':
                            //TODO: Add additional field to collect data for Lead_Organization_Location_2__c
                            break;
                    }

                    jQuery(".mktoForm, .mktoForm *").removeAttr("style");
                    var formElement = form.getFormElem();
                    if(settings.sunrun_leadforms.form !== 'referral-form' && settings.sunrun_leadforms.form !== 'soft-signup') {
                        formElement.find(".mktoButtonRow").after("<p class='form-autodialer-opt-in'>By clicking above, I authorize Sunrun to call me or send pre-recorded or text messages to me about Sunrun products and services at the telephone number above using an automatic telephone dialing system, even if I am on a national or state \"Do Not Call\" list. Message and data rates may apply. I understand that consent is not a condition of purchase.</p>"
                        );
                    }

                    form.onValidate(function (values)
                    {
                        var vals = form.vals();
                        var zipPattern = /(^\d{5}$)/;
                        var numbersPattern = /^[0-9]+$/;
                        var phonePattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                        var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                        var toperrors = "";
                        var hasErrors = false;
                        var $messages = $('.error-top-fields');

                        //TODO: refactor marketo form validation
                        if(settings.sunrun_leadforms.form == 'soft-signup')
                        {
                            if ( !( emailPattern.test( vals.Email ) ) ) {
                                hasErrors = true;
                                var email = formElement.find("#Email");
                                showError('#Email', 'Please enter a valid email address.', email);
                            } else {
                                removeError('#Email');
                            }
                        } else if(settings.sunrun_leadforms.form == 'referral-form') {

                            if (vals.FirstName.length == 0) {
                                hasErrors = true;
                                var firstName = formElement.find("#FirstName");
                                showError('#FirstName', 'Please enter their first name.', firstName);
                            } else {
                                removeError('#FirstName');
                            }

                            if (vals.LastName.length == 0) {
                                hasErrors = true;
                                var lastName = formElement.find("#LastName");
                                showError('#LastName', 'Please enter their last name.', lastName);
                            } else {
                                removeError('#LastName');
                            }

                            if ( !( emailPattern.test( vals.Email ) ) ) {
                                hasErrors = true;
                                var email = formElement.find("#Email");
                                showError('#Email', 'Please enter a valid email address.', email);
                            } else {
                                removeError('#Email');
                            }

                            if (!( phonePattern.test(vals.Phone) )) {
                                hasErrors = true;
                                var phone = formElement.find("#Phone");
                                showError('#Phone', 'Please enter a valid phone number.', phone);
                            } else {
                                removeError('#Phone');
                            }

                            //Referral information
                            if (vals.Referred_by_Contact_First_Name__c.length == 0) {
                                hasErrors = true;
                                var firstName = formElement.find("#Referred_by_Contact_First_Name__c");
                                showError('#Referred_by_Contact_First_Name__c', 'Please enter your first name.', firstName);
                            } else {
                                removeError('#Referred_by_Contact_First_Name__c');
                            }

                            if (vals.Referred_by_Contact_Last_Name__c.length == 0) {
                                hasErrors = true;
                                var lastName = formElement.find("#Referred_by_Contact_Last_Name__c");
                                showError('#Referred_by_Contact_Last_Name__c', 'Please enter your last name.', lastName);
                            } else {
                                removeError('#Referred_by_Contact_Last_Name__c');
                            }

                            if ( !( emailPattern.test( vals.Referred_by_Contact_Email__c ) ) ) {
                                hasErrors = true;
                                var email = formElement.find("#Referred_by_Contact_Email__c");
                                showError('#Referred_by_Contact_Email__c', 'Please enter a valid email address.', email);
                            } else {
                                removeError('#Referred_by_Contact_Email__c');
                            }

                            if (!( phonePattern.test(vals.Referred_by_Contact_Phone__c) )) {
                                hasErrors = true;
                                var phone = formElement.find("#Referred_by_Contact_Phone__c");
                                showError('#Referred_by_Contact_Phone__c', 'Please enter a valid phone number.', phone);
                            } else {
                                removeError('#Referred_by_Contact_Phone__c');
                            }

                        } else {

                            if (vals.FirstName.length == 0) {
                                hasErrors = true;
                                var firstName = formElement.find("#FirstName");
                                showError('#FirstName', 'Please enter your first name.', firstName);
                            } else {
                                removeError('#FirstName');
                            }

                            if (vals.LastName.length == 0) {
                                hasErrors = true;
                                var lastName = formElement.find("#LastName");
                                showError('#LastName', 'Please enter your last name.', lastName);
                            } else {
                                removeError('#LastName');
                            }

                            if (!( emailPattern.test(vals.Email) )) {
                                hasErrors = true;
                                var email = formElement.find("#Email");
                                showError('#Email', 'Please enter a valid email address.', email);
                            } else {
                                removeError('#Email');
                            }

                            if (!( phonePattern.test(vals.Phone) )) {
                                hasErrors = true;
                                var phone = formElement.find("#Phone");
                                showError('#Phone', 'Please enter a valid phone number.', phone);
                            } else {
                                removeError('#Phone');
                            }

                            // Validate zipcode
                            if (!( zipPattern.test(vals.PostalCode) )) {
                                hasErrors = true;
                                var postalCode = formElement.find("#PostalCode");
                                showError('#PostalCode', 'Please enter a valid zip code.', postalCode);
                            } else if (zipcodes.indexOf(vals.PostalCode) < 0) {
                                hasErrors = true;
                                var postalCode = formElement.find("#PostalCode");
                                showError('#PostalCode', 'We\'re sorry! Sunrun is not yet available where you live. We will send you an email when Sunrun becomes available in your area.', postalCode);
                            } else {
                                removeError('#PostalCode');
                            }

                            // Validate electric bill
                            if (!( numbersPattern.test(vals.Average_Monthly_Electric_Bill__c) )) {
                                hasErrors = true;
                                var monthlyBill = formElement.find("#Average_Monthly_Electric_Bill__c");
                                showError('#Average_Monthly_Electric_Bill__c', 'Please enter the amount of your typical monthly bill, e.g. 180.', monthlyBill);
                            } else {
                                removeError('#Average_Monthly_Electric_Bill__c');
                            }

                        }

                        if(hasErrors) {
                            // Google Analitycs track errors
                            if(settings.sunrun_leadforms.form == 'standard-leadform'){
                                ga('send', 'event', 'errors', 'quote form ', 'validation error');
                            }
                            form.submittable(false);
                        } else {
                            form.submittable(true);
                        }
                        //TODO: there may not be anything needed in this callback if we use the validation given to us by marketo.

                    });

                    form.onSuccess(function (values, followUpUrl)
                    {
                        form.getFormElem().hide();
                        $('.leadform-top-fields').html('Enter your street address');

                        if(settings.sunrun_leadforms.form == 'soft-signup')
                        {
                          ga('send', 'event', 'sign up', 'submit', 'submit success');
                        }
                        else if(settings.sunrun_leadforms.form == 'standard-leadform')
                        {
                          dataLayer.push({
                             'event': 'quote-form-progress',
                             'state': 'Quote Form',
                             'action': 'Submit',
                             'widget': ' Step 1'
                           });
                           dataLayer.push({'event' : 'lead-form-submitted'});
                            // Optimizely conversion tracking
                            window['optimizely'] = window['optimizely'] || [];
                            window.optimizely.push(["trackEvent", "leadform_submit"]);

                            MktoForms2.loadForm(settings.sunrun_leadforms.environment, settings.sunrun_leadforms.munchkin_id, settings.sunrun_leadforms.form_id_step_2, function (FollowUpForm)
                            {
                                // scroll to the top of the form div for the second step of the form on mobile
                                if ($(window).width() <= 1024) {
                                  $('html,body').animate({
                                    scrollTop: $('.pane-sunrun-leadform').offset().top - 20
                                  }, 500);
                                }

                                var FollowUpFormElement = FollowUpForm.getFormElem();
                                FollowUpFormElement.removeAttr('style');
                                FollowUpFormElement.find('*').removeAttr('style');

                                FollowUpForm.onValidate(function (values) {

                                });

                                FollowUpForm.onSuccess(function (values, followUpUrl) {
                                    FollowUpFormElement.hide();
                                    // Google Analitycs event
                                    ga('send', 'event', 'quote form', 'submit (step 2) ', settings.sunrun_tracking.full_url);
                                    // Universal Analytics Event Tracking Step 2
                                    dataLayer.push({
                                        'event': 'quote-form-progress',
                                        'state': 'Quote Form',
                                        'action': 'Submit',
                                        'widget': ' Step 2'
                                    });
                                    // Google Analitycs track thanks page
                                    ga('send', 'event', 'quote form', 'view (thanks) ', settings.sunrun_tracking.full_url);
                                    /* Universal Analytics: track thanks page */
                                    dataLayer.push({
                                        'event': 'quote-form-progress',
                                        'state': 'Quote Form',
                                        'action': 'View',
                                        'widget': 'Thanks'
                                    });

                                    // Redirect if needed
                                    if(typeof settings.sunrun_leadforms.redirect !== 'undefined' && settings.sunrun_leadforms.redirect){
                                        window.location.href = settings.basePath + settings.sunrun_leadforms.redirect;
                                        return false;
                                    }
                                });  // FollowUpForm.onSuccess
                            });
                            return false;
                        }
                        // Redirect if needed
                        if(typeof settings.sunrun_leadforms.redirect !== 'undefined' && settings.sunrun_leadforms.redirect){
                            window.location.href = settings.basePath + settings.sunrun_leadforms.redirect;
                            return false;
                        }
                    });
                });

                function showError(field, text, ref) {
                    if(!$(field).closest('.mktoFormRow').children('.error').length) {
                        ref.closest('.mktoFormRow').append('<div class="error">'+ text +'</div>');
                    }
                }

                function removeError(field) {
                    if($(field).closest('.mktoFormRow').children('.error').length)
                    {
                        $(field).closest('.mktoFormRow').children('.error').remove();
                    }
                }
            }

        }
    };

})(jQuery);
;
(function ($) {

/**
 * A progressbar object. Initialized with the given id. Must be inserted into
 * the DOM afterwards through progressBar.element.
 *
 * method is the function which will perform the HTTP request to get the
 * progress bar state. Either "GET" or "POST".
 *
 * e.g. pb = new progressBar('myProgressBar');
 *      some_element.appendChild(pb.element);
 */
Drupal.progressBar = function (id, updateCallback, method, errorCallback) {
  var pb = this;
  this.id = id;
  this.method = method || 'GET';
  this.updateCallback = updateCallback;
  this.errorCallback = errorCallback;

  // The WAI-ARIA setting aria-live="polite" will announce changes after users
  // have completed their current activity and not interrupt the screen reader.
  this.element = $('<div class="progress-wrapper" aria-live="polite"></div>');
  this.element.html('<div id ="' + id + '" class="progress progress-striped active">' +
                    '<div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">' +
                    '<div class="percentage sr-only"></div>' +
                    '</div></div>' +
                    '</div><div class="percentage pull-right"></div>' +
                    '<div class="message">&nbsp;</div>');
};

/**
 * Set the percentage and status message for the progressbar.
 */
Drupal.progressBar.prototype.setProgress = function (percentage, message) {
  if (percentage >= 0 && percentage <= 100) {
    $('div.progress-bar', this.element).css('width', percentage + '%');
    $('div.progress-bar', this.element).attr('aria-valuenow', percentage);
    $('div.percentage', this.element).html(percentage + '%');
  }
  $('div.message', this.element).html(message);
  if (this.updateCallback) {
    this.updateCallback(percentage, message, this);
  }
};

/**
 * Start monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.startMonitoring = function (uri, delay) {
  this.delay = delay;
  this.uri = uri;
  this.sendPing();
};

/**
 * Stop monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.stopMonitoring = function () {
  clearTimeout(this.timer);
  // This allows monitoring to be stopped from within the callback.
  this.uri = null;
};

/**
 * Request progress data from server.
 */
Drupal.progressBar.prototype.sendPing = function () {
  if (this.timer) {
    clearTimeout(this.timer);
  }
  if (this.uri) {
    var pb = this;
    // When doing a post request, you need non-null data. Otherwise a
    // HTTP 411 or HTTP 406 (with Apache mod_security) error may result.
    $.ajax({
      type: this.method,
      url: this.uri,
      data: '',
      dataType: 'json',
      success: function (progress) {
        // Display errors.
        if (progress.status == 0) {
          pb.displayError(progress.data);
          return;
        }
        // Update display.
        pb.setProgress(progress.percentage, progress.message);
        // Schedule next timer.
        pb.timer = setTimeout(function () { pb.sendPing(); }, pb.delay);
      },
      error: function (xmlhttp) {
        pb.displayError(Drupal.ajaxError(xmlhttp, pb.uri));
      }
    });
  }
};

/**
 * Display errors on the page.
 */
Drupal.progressBar.prototype.displayError = function (string) {
  var error = $('<div class="alert alert-block alert-error"><a class="close" data-dismiss="alert" href="#">&times;</a><h4>Error message</h4></div>').append(string);
  $(this.element).before(error).hide();

  if (this.errorCallback) {
    this.errorCallback(this);
  }
};

})(jQuery);
;
(function ($) {

  Drupal.personalize = Drupal.personalize || {};
  Drupal.personalize.executors = Drupal.personalize.executors || {};
  Drupal.personalize.executors.personalizeElements = {
    execute: function($option_set, choice_name, osid, preview) {
      if (typeof preview === 'undefined') { preview = false; }
      var element = Drupal.settings.personalize_elements.elements[osid];
      if (element == undefined) return;
      if (Drupal.personalizeElements.hasOwnProperty(element.variation_type) && typeof Drupal.personalizeElements[element.variation_type].execute === 'function') {
        if (preview && !element.previewable) {
          // If this variation is not previewable in the normal way, we can just reload
          // the page with the selected option.
          var base = Drupal.settings.basePath + Drupal.settings.pathPrefix;
          var path = location.pathname && /^(?:[\/\?\#])*(.*)/.exec(location.pathname)[1] || '';
          var param = Drupal.settings.personalize.optionPreselectParam;
          document.location.href = base + path + '?' + param + '=' + osid + '--' + choice_name;
        }
        else {
          // Add the personalize data attribute for the option set.
          if ($option_set.length > 0) {
            $option_set.attr('data-personalize', osid);
          }
          var choices = Drupal.settings.personalize.option_sets[osid].options,  selectedChoice = null, selectedContent = null, isControl = false, choiceIndex = null, choice = null;
          if (choice_name) {
            for (choiceIndex in choices) {
              choice = choices[choiceIndex];
              if (choice.option_id == choice_name) {
                selectedChoice = choice;
                break;
              }
            }
          }
          // This might be a "do nothing" option, either because it is the control option
          // or because it is an option with no content, in which case we treat is as the
          // control option.
          if (choice_name == Drupal.settings.personalize.controlOptionName || !selectedChoice || !selectedChoice.hasOwnProperty('personalize_elements_content')) {
            isControl = true;
          }
          else {
            selectedContent = selectedChoice.personalize_elements_content;
          }
          // runJS does not require a selector and editHtml can result in an
          // empty option set if the new html alters the DOM structure.
          if ($option_set.length == 0 && ['runJS','editHtml'].indexOf(element.variation_type) == -1) {
            return;
          } else if ($option_set.length > 1) {
            var agent_name = Drupal.settings.personalize.option_sets[osid].agent;
            Drupal.personalize.debug('Selector ' + element.selector + ' in campaign ' + agent_name + ' matches multiple DOM elements, cannot perform personalization', 5010);
            // Cannot perform personalization on sets of matched elements.
            return;
          }
          Drupal.personalizeElements[element.variation_type].execute($option_set, selectedContent, isControl, osid);
          Drupal.personalize.executorCompleted($option_set, choice_name, osid);
        }
      }
    }
  };

  Drupal.personalizeElements = {};

  Drupal.personalizeElements.runJS = {
    execute : function ($selector, selectedContent, isControl, osid) {
      if (!isControl) {
        // The contents of the selectedContent variable were written by someone
        // who was explicitly given permission to write JavaScript to be executed
        // on this site. Mitigating the evil of the eval.
        eval(selectedContent);
      }
    }
  };

  Drupal.personalizeElements.replaceHtml = {
    controlContent : {},
    execute : function($selector, selectedContent, isControl, osid) {
      // We need to keep track of how we've changed the element, if only
      // to support previewing different options.
      if (isControl && !this.controlContent.hasOwnProperty(osid)) {
        this.controlContent[osid] = $selector.html();
      }
      if (isControl) {
        $selector.html(this.controlContent[osid]);
      }
      else {
        $selector.html(selectedContent);
        Drupal.attachBehaviors($selector);
      }

    }
  };

  Drupal.personalizeElements.editHtml = {
    controlContent: {},
    getOuterHtml: function ($element) {
      if ($element.length > 1) {
        $element = $element.first();
      }
      // jQuery doesn't have an outerHTML so we need to clone the child and
      // give it a parent so that we can call that parent's html function.
      // This ensures we get only the html of the $selector and not siblings.
      var $element = $element.clone().wrap('<div>').parent();

      // Now return the child html of our wrapper parent tag.
      return $element.html();
    },
    // JQuery does not provide a public way to find events so we have to resort
    // to semi-documented structures.
    // http://blog.jquery.com/2011/11/08/building-a-slimmer-jquery/
    getElementEvents: function ($element) {
      if ($element.length === 0) return {};
      if ($._data) {
        // jQuery 1.8 and higher.
        return $._data($element.get(0), "events");
      } else if ($element.data) {
        // Older jQuery version.
        return $element.data('events');
      }
      return {};
    },
    addElementEvents: function($element, events) {
      for (var type in events) {
        var i, num = events[type].length;
        for (i = 0; i < num;  i++) {
          var event = events[type][i];
          if (event.handler) {
            var eventBind = (event.namespace && event.namespace.length > 0) ? type + '.' + event.namespace : type;
            var dataBind = event.data ? event.data : {};
            $element.bind(eventBind, dataBind, event.handler);
          }
        }
      }
    },
    addElementData: function($element, data) {
      for (var key in data) {
        $.data($element.get(0), key, data[key]);
      }
      return $element;
    },
    getElement: function (osid) {
      return $('[data-personalize="' + osid + '"]');
    },
    execute : function($selector, selectedContent, isControl, osid) {
      // Keep track of how the element has been changed in order to preview
      // different options.
      if (isControl && !this.controlContent.hasOwnProperty(osid)) {
        this.controlContent[osid] = this.getOuterHtml($selector);
      }
      if ($selector.length === 0) {
        $selector = this.getElement(osid);
      }
      var events = this.getElementEvents($selector);
      var data = $selector.data();
      if (isControl) {
        $selector.replaceWith(this.controlContent[osid]);
        // Reset the $selector variable to the new element.
        $selector = this.getElement(osid);
        this.addElementEvents($selector, events);
        this.addElementData($selector, data);
      } else {
        if (selectedContent.charAt(0) != '<') {
          // We need this content to be wrapped in a tag so that it can be
          // marked with the osid for later selection.
          selectedContent = '<span>' + selectedContent + '</span>';
        }
        var $newContent = $(selectedContent).replaceAll($selector);
        // Add the data attribute to the new content.
        $newContent.attr('data-personalize', osid);
        this.addElementEvents($newContent, events);
        this.addElementData($newContent, data);
      }
    }
  };

  Drupal.personalizeElements.editText = {
    controlContent: {},
    execute : function($selector, selectedContent, isControl, osid) {
      // Keep track of how the element has been changed in order to preview
      // different options.
      if (isControl && !this.controlContent.hasOwnProperty(osid)) {
        this.controlContent[osid] = $selector.text();
      }
      if (isControl) {
        $selector.text(this.controlContent[osid]);
      } else {
        $selector.text(selectedContent);
      }
    }
  };

  Drupal.personalizeElements.addClass = {
    addedClasses : {},
    execute : function($selector, selectedContent, isControl, osid) {
      // We need to keep track of how we've changed the element, if only
      // to support previewing different options.
      if (!this.addedClasses.hasOwnProperty(osid)) {
        this.addedClasses[osid] = [];
      }
      for (var i in this.addedClasses[osid]) {
        if (this.addedClasses[osid].hasOwnProperty(i)) {
          $selector.removeClass(this.addedClasses[osid].shift());
        }
      }
      if (!isControl) {
        $selector.addClass(selectedContent);
        this.addedClasses[osid].push(selectedContent);
      }
    }
  };

  Drupal.personalizeElements.appendHtml = {
    execute : function($selector, selectedContent, isControl, osid) {
      var id = 'personalize-elements-append-' + osid;
      $('#' + id).remove();
      if (!isControl) {
        $selector.append('<span id="' + id + '">' + selectedContent + '</span>');
        Drupal.attachBehaviors($selector);
      }
    }
  };

  Drupal.personalizeElements.prependHtml = {
    execute : function($selector, selectedContent, isControl, osid) {
      var id = 'personalize-elements-prepend-' + osid;
      $('#' + id).remove();
      if (!isControl) {
        $selector.prepend('<span id="' + id + '">' + selectedContent + '</span>');
        Drupal.attachBehaviors($selector);
      }
    }
  };

})(jQuery);
;
