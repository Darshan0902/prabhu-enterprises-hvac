from django.shortcuts import render
from .models import Client

def home(request):
    clients = Client.objects.filter(is_active=True)
    return render(request, 'core/home.html', {'clients': clients})