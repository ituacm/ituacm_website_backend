from fastapi import APIRouter, HTTPException

from app.core.config import settings
from app.models import ContactForm, ContactFormBase
from app.utils import generate_contact_request_email, send_email
router = APIRouter()

@router.post("/", response_model=ContactForm)
def contact(*, contact_form_in: ContactFormBase):
    """Send a mail with the contact request.

    Args:
        contact_form_in (ContactFormBase)
    """
    
    contact_form = ContactForm.model_validate(contact_form_in)
    
    assert settings.emails_enabled, "Emails are not enabled! Set up the SMTP configuration."
    email_data = generate_contact_request_email(contact_form=contact_form)
    send_email(
        email_to=settings.FIRST_SUPERUSER,
        subject=email_data.subject,
        html_content=email_data.html_content
    )
    
    return contact_form