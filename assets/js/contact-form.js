/**
 * BRIGHTLINGSEA ACADEMY — CONTACT FORM (3-STEP INQUIRY WIZARD)
 * Drives: type selection -> details -> confirmation.
 *
 * There is no back end in this project. The wizard validates, then shows the
 * confirmation step with a generated reference. To actually deliver messages,
 * set data-endpoint="<url>" on the #contactForm element (e.g. a Formspree /
 * Netlify form URL) and this script will POST JSON to it instead of stopping
 * at the confirmation step.
 */
(function () {
    'use strict';

    var OFFICE_EMAIL = 'brightlingseaacademy@gmail.com';
    var STEP_TITLES = { 1: 'Choose inquiry type', 2: 'Enter your details', 3: 'Confirm your inquiry' };

    // Extra fields injected per inquiry type. `required` fields are validated
    // on step 2.
    var TYPE_FIELDS = {
        'Admissions': [
            { id: 'admissionsClass', label: 'Class Applying For', type: 'select', required: true, options: ['Nursery', 'KG 1', 'KG 2', 'Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6', 'JHS 1', 'JHS 2', 'JHS 3'] }
        ],
        'Results Help': [
            { id: 'resultsStudent', label: 'Student&rsquo;s Name', type: 'text', required: true, placeholder: 'Name on the certificate' },
            { id: 'resultsYear', label: 'Exam Year', type: 'select', required: true, options: ['2024', '2025', '2026'] }
        ],
        'Fee Payment': [
            { id: 'feeClass', label: 'Class / Grade', type: 'text', required: true, placeholder: 'e.g. Primary 4' },
            { id: 'feeItem', label: 'What is this payment for?', type: 'text', required: false, placeholder: 'e.g. Term 1 fees, school uniform' }
        ],
        'Employment': [
            { id: 'jobRole', label: 'Role Applied For', type: 'text', required: true, placeholder: 'e.g. Class Teacher' },
            { id: 'jobSubject', label: 'Subject / Specialisation', type: 'text', required: false, placeholder: 'Optional' }
        ],
        'General Inquiry': []
    };

    function ready(fn) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            fn();
        }
    }
    ready(function () {
        var form = document.getElementById('contactForm');
        if (!form) { return; }

        var steps = Array.prototype.slice.call(form.querySelectorAll('.contact-step'));
        var indicators = Array.prototype.slice.call(form.querySelectorAll('.step-indicator'));
        var status = document.getElementById('contactStepStatus');
        var dynamicFields = document.getElementById('contactDynamicFields');
        var typeError = document.getElementById('contactTypeError');

        var btnNext1 = document.getElementById('contactNextBtn1');
        var btnBack2 = document.getElementById('contactBackBtn2');
        var btnNext2 = document.getElementById('contactNextBtn2');
        var btnReset = document.getElementById('contactResetBtn');
        var refOut = document.getElementById('contactRefNumber');
        var typeOut = document.getElementById('contactConfirmType');
        var waLink = form.querySelector('a[href*="wa.me"]');

        var current = 1;
        var selectedType = '';

        // ---------- helpers ----------
        function show(el, on) {
            if (!el) { return; }
            el.style.display = on ? '' : 'none';
        }

        function setError(inputId, errorId, on) {
            var input = document.getElementById(inputId);
            var box = document.getElementById(errorId);
            if (input) { input.classList.toggle('error', !!on); }
            if (box) { box.style.display = on ? 'block' : 'none'; }
            return !on;
        }

        function value(id) {
            var el = document.getElementById(id);
            return el ? String(el.value || '').trim() : '';
        }

        function selectedRadio() {
            var checked = form.querySelector('input[name="inquiryType"]:checked');
            return checked ? checked.value : '';
        }
        // ---------- dynamic fields ----------
        function buildField(spec) {
            var group = document.createElement('div');
            group.className = 'form-group';
            group.style.marginTop = '16px';

            var label = document.createElement('label');
            label.className = 'form-label';
            label.setAttribute('for', spec.id);
            label.innerHTML = spec.label + (spec.required ? ' <span style="color:var(--orange);">*</span>' : '');
            group.appendChild(label);

            var input;
            if (spec.type === 'select') {
                input = document.createElement('select');
                var blank = document.createElement('option');
                blank.value = '';
                blank.textContent = 'Select...';
                input.appendChild(blank);
                spec.options.forEach(function (opt) {
                    var o = document.createElement('option');
                    o.value = opt;
                    o.textContent = opt;
                    input.appendChild(o);
                });
            } else {
                input = document.createElement('input');
                input.type = 'text';
                if (spec.placeholder) { input.placeholder = spec.placeholder; }
            }
            input.id = spec.id;
            input.className = 'form-input';
            group.appendChild(input);

            var err = document.createElement('div');
            err.className = 'form-error';
            err.id = spec.id + 'Error';
            err.style.display = 'none';
            err.textContent = 'Please complete this field';
            group.appendChild(err);

            return group;
        }

        function renderTypeFields(type) {
            if (!dynamicFields) { return; }
            Array.prototype.slice.call(dynamicFields.querySelectorAll('.form-group[data-dyn]')).forEach(function (el) {
                el.parentNode.removeChild(el);
            });
            (TYPE_FIELDS[type] || []).forEach(function (spec) {
                var group = buildField(spec);
                group.setAttribute('data-dyn', spec.id);
                dynamicFields.appendChild(group);
            });
        }

        // ---------- navigation ----------
        function goTo(step) {
            current = step;
            steps.forEach(function (panel) {
                show(panel, Number(panel.getAttribute('data-step')) === step);
            });
            indicators.forEach(function (dot) {
                var n = Number(dot.getAttribute('data-step'));
                dot.classList.toggle('active', n === step);
                dot.classList.toggle('done', n < step);
                if (n === step) { dot.setAttribute('aria-current', 'step'); } else { dot.removeAttribute('aria-current'); }
            });
            if (status) { status.textContent = 'Step ' + step + ' of 3: ' + STEP_TITLES[step]; }

            var active = steps.filter(function (p) { return Number(p.getAttribute('data-step')) === step; })[0];
            if (active) {
                var first = active.querySelector('input:not([type="hidden"]), select, textarea, button');
                if (first) { window.setTimeout(function () { first.focus(); }, 0); }
            }
            try {
                form.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } catch (e) { /* older browsers: ignore */ }
        }
        // ---------- validation ----------
        function validateStep1() {
            var type = selectedRadio();
            if (!type) {
                if (typeError) { typeError.hidden = false; }
                var firstRadio = form.querySelector('input[name="inquiryType"]');
                if (firstRadio) { firstRadio.focus(); }
                return false;
            }
            if (typeError) { typeError.hidden = true; }
            return true;
        }

        function validateStep2() {
            var ok = true;
            var name = value('contactFullName');
            ok = setError('contactFullName', 'contactFullNameError', !name) && ok;
            if (!name) { document.getElementById('contactFullName').focus(); }

            var email = value('contactEmail');
            var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
            ok = setError('contactEmail', 'contactEmailError', !emailOk) && ok;
            if (!emailOk && name) { document.getElementById('contactEmail').focus(); }

            var msg = value('contactMessage');
            ok = setError('contactMessage', 'contactMessageError', msg.length < 10) && ok;
            if (msg.length < 10 && name && emailOk) { document.getElementById('contactMessage').focus(); }

            (TYPE_FIELDS[selectedType] || []).forEach(function (spec) {
                if (spec.required) { ok = setError(spec.id, spec.id + 'Error', value(spec.id) === '') && ok; }
            });
            return ok;
        }

        form.addEventListener('input', function (e) {
            var t = e.target;
            if (!t || !t.id) { return; }
            var err = document.getElementById(t.id + 'Error');
            if (err) { err.style.display = 'none'; t.classList.remove('error'); }
        });

        // ---------- reference + submit ----------
        function makeReference() {
            return 'BLA-' + new Date().getFullYear() + '-' + (Math.floor(Math.random() * 9000) + 1000);
        }

        function collect() {
            var payload = {
                reference: '',
                inquiryType: selectedType,
                fullName: value('contactFullName'),
                email: value('contactEmail'),
                phone: value('contactPhone'),
                childName: value('contactChildName'),
                message: value('contactMessage'),
                extra: {}
            };
            (TYPE_FIELDS[payload.inquiryType] || []).forEach(function (spec) {
                payload.extra[spec.id] = value(spec.id);
            });
            return payload;
        }

        function send(payload) {
            var endpoint = form.getAttribute('data-endpoint');
            if (!endpoint) { return Promise.resolve(true); } // no back end configured
            return fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(payload)
            }).then(function (res) { return res.ok; }).catch(function () { return false; });
        }
        // ---------- events ----------
        if (btnNext1) {
            btnNext1.addEventListener('click', function () {
                if (!validateStep1()) { return; }
                selectedType = selectedRadio();
                renderTypeFields(selectedType);
                goTo(2);
            });
        }

        if (btnBack2) {
            btnBack2.addEventListener('click', function () { goTo(1); });
        }

        if (btnNext2) {
            btnNext2.addEventListener('click', function () {
                if (!validateStep2()) { return; }
                var payload = collect();
                payload.reference = makeReference();

                btnNext2.disabled = true;
                btnNext2.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin" aria-hidden="true"></i>';

                send(payload).then(function (ok) {
                    btnNext2.disabled = false;
                    btnNext2.innerHTML = 'Next: Confirm <i class="fas fa-arrow-right"></i>';

                    if (refOut) { refOut.textContent = payload.reference; }
                    if (typeOut) { typeOut.textContent = payload.inquiryType; }
                    if (waLink) {
                        waLink.setAttribute('href', 'https://wa.me/2332485868467?text=' +
                            encodeURIComponent('Inquiry ' + payload.reference + ' (' + payload.inquiryType + ') from ' + payload.fullName));
                    }
                    if (!ok && form.getAttribute('data-endpoint') && status) {
                        status.textContent = 'We could not reach the office service. Your reference is ' +
                            payload.reference + ' — please email ' + OFFICE_EMAIL + ' or use WhatsApp.';
                    }
                    goTo(3);
                });
            });
        }

        if (btnReset) {
            btnReset.addEventListener('click', function () {
                form.reset();
                selectedType = '';
                renderTypeFields('');
                if (typeError) { typeError.hidden = true; }
                Array.prototype.slice.call(form.querySelectorAll('.form-error')).forEach(function (el) {
                    el.style.display = 'none';
                });
                Array.prototype.slice.call(form.querySelectorAll('.form-input.error')).forEach(function (el) {
                    el.classList.remove('error');
                });
                goTo(1);
            });
        }

        form.addEventListener('keydown', function (e) {
            if (e.key !== 'Enter' || e.target.tagName === 'TEXTAREA') { return; }
            e.preventDefault();
            if (current === 1 && btnNext1) { btnNext1.click(); }
            else if (current === 2 && btnNext2) { btnNext2.click(); }
        });

        goTo(1);
    });
})();
