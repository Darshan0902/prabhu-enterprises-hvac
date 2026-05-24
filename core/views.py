from django.shortcuts import render
from .models import Client
from services.models import Service, FaqItem

def home(request):
    clients = Client.objects.filter(is_active=True)
    return render(request, 'core/home.html', {'clients': clients})

def services_list(request):
    services = Service.objects.all()
    faq_items = FaqItem.objects.all()
    clients = Client.objects.filter(is_active=True)

    default_mumbai_x = 32.0
    default_mumbai_y = 72.0

    client_pin_groups = {}
    for client in clients:
        x = float(client.map_x) if client.map_x is not None else default_mumbai_x
        y = float(client.map_y) if client.map_y is not None else default_mumbai_y
        key = f"{x}-{y}"
        group = client_pin_groups.setdefault(key, {
            'x': x,
            'y': y,
            'clients': [],
        })
        group['clients'].append(client)

    return render(
        request,
        'core/services.html',
        {
            'services': services,
            'faq_items': faq_items,
            'client_pin_groups': list(client_pin_groups.values()),
        }
    )