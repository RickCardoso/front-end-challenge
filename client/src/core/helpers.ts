export function getValidationClass(form: any, fieldName: string) {
  const field = form[fieldName];
  if (field) {
    return {
      'md-invalid': field.$invalid && field.$dirty,
    };
  }
}
