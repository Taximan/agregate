import React from 'react';
import { hashCode } from '../../lib/util';
import classNames from 'classnames';


export function FormTextArea({
    label,
    formik,
    autoFocus = false,
    field
}) {
    const id = hashCode(label);
    const hasError = formik.touched[field] && formik.errors[field];
    const wrapperClasses = classNames('form-group', { 'has-danger': hasError });

    return (
        <div className={wrapperClasses}>
            <label htmlFor={id}>{label}:</label>
            <textarea
                autoFocus={autoFocus}
                id={id}
                name={field}
                disabled={formik.isSubmitting}
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[field]}
            >

            </textarea>
            {hasError && <div className="form-control-feedback">{formik.errors[field]}</div>}
        </div>
    )
};

export function FormTextInput({
    label,
    type = 'text',
    formik,
    autoFocus = false,
    field
}) {
    const id = hashCode(label);
    const hasError = formik.touched[field] && formik.errors[field];
    const wrapperClasses = classNames('form-group', { 'has-danger': hasError });

    return (
        <div className={wrapperClasses}>
            <label htmlFor={id}>{label}:</label>
            <input
                autoFocus={autoFocus}
                id={id}
                type={type}
                name={field}
                disabled={formik.isSubmitting}
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[field]}
            />
            {hasError && <div className="form-control-feedback">{formik.errors[field]}</div>}
        </div>
    )
};
