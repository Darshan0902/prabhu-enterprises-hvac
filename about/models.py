import datetime

from django.db import models
from django.utils import timezone


class AboutProject(models.Model):
    title = models.CharField(max_length=160)
    year = models.IntegerField(blank=True, null=True,help_text="Project year (e.g., 2024)")
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='about/', blank=True, null=True)
    start_date = models.DateField(default=timezone.now)
    detailed_description = models.TextField(blank=True, help_text="Full in-depth project description")
    location = models.CharField(max_length=200, blank=True)
    project_type = models.CharField(max_length=100, blank=True)
    end_date = models.DateField(default=timezone.now)
    days_to_complete = models.PositiveIntegerField(blank=True, null=True)
    duration = models.CharField(
        max_length=100,
        blank=True,
        help_text='Optional summary like "3 months", "6 weeks", or "1 year"'
    )
    time_taken = models.DurationField(
        blank=True,
        null=True,
        help_text='Total time taken for the project, for example 45 days of work.'
    )
    order = models.IntegerField(default=0, help_text='Lower values appear first')
    is_active = models.BooleanField(default=True, help_text='Show this project on the about timeline')

    class Meta:
        ordering = ['order', '-start_date']
        verbose_name = 'About Project'
        verbose_name_plural = 'About Projects'

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.year and self.start_date:
            self.year = self.start_date.year
        if self.start_date and self.end_date:
            delta = self.end_date - self.start_date
            if self.days_to_complete in (None, ''):
                self.days_to_complete = delta.days + 1
            if not self.time_taken:
                self.time_taken = datetime.timedelta(days=delta.days + 1)
        super().save(*args, **kwargs)

    @property
    def project_duration(self):
        if self.start_date and self.end_date:
            return f"{self.start_date.strftime('%b %d, %Y')} - {self.end_date.strftime('%b %d, %Y')}"
        return ''

    @property
    def time_taken_readable(self):
        if not self.time_taken:
            return ''
        total_seconds = int(self.time_taken.total_seconds())
        hours, remainder = divmod(total_seconds, 3600)
        minutes, seconds = divmod(remainder, 60)
        parts = []
        if hours:
            parts.append(f"{hours}h")
        if minutes:
            parts.append(f"{minutes}m")
        if seconds:
            parts.append(f"{seconds}s")
        return ' '.join(parts) or '0s'
