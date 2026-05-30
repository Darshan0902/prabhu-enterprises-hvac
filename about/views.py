from django.http import JsonResponse
from .models import AboutProject
from django.shortcuts import render


def about(request):
    projects = AboutProject.objects.filter(is_active=True).order_by('year', 'order')
    return render(request, 'about/about.html', {'projects': projects})

def projects_api(request):
    projects = AboutProject.objects.filter(is_active=True).order_by('year', 'order')
    data = []
    for p in projects:
        data.append({
            'id': p.id,
            'title': p.title,
            'year': p.year or (p.start_date.year if p.start_date else None),
            'description': p.description,
            'detailed_description': getattr(p, 'detailed_description', ''),
            'location': getattr(p, 'location', ''),
            'duration': p.duration or f"{p.days_to_complete} days" if p.days_to_complete else '',
            'image_url': p.image.url if p.image else None,
        })
    return JsonResponse({'projects': data})