from django.shortcuts import render
from .models import Client
from services.models import Service, FaqItem

def home(request):
    clients = Client.objects.filter(is_active=True)
    return render(request, 'core/home.html', {'clients': clients})

def services_list(request):
    services = Service.objects.all()
    faq_items = FaqItem.objects.all()
    return render(request, 'core/services.html', {'services': services, 'faq_items': faq_items})