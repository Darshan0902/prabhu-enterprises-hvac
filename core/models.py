from django.db import models

class Client(models.Model):
    name = models.CharField(max_length=100, help_text="Client/Company name")
    logo = models.ImageField(upload_to='clients/', help_text="Client logo image (preferably PNG with transparent bg)")
    website_url = models.URLField(blank=True, null=True, help_text="Optional client website link")
    location = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text="City or region name shown on the India map tooltip",
    )
    map_x = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        blank=True,
        null=True,
        help_text="Horizontal map position on the India map, as a percentage (0-100)",
    )
    map_y = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        blank=True,
        null=True,
        help_text="Vertical map position on the India map, as a percentage (0-100)",
    )
    order = models.IntegerField(default=0, help_text="Order in scrolling belt (lower = appears earlier)")
    is_active = models.BooleanField(default=True, help_text="Show this client on website")
    
    class Meta:
        ordering = ['order']
        verbose_name = "Client"
        verbose_name_plural = "Clients"
    
    def __str__(self):
        return self.name