from __future__ import unicode_literals

from django.db import models

# Create your models here.

class IndexModel(models.Model):
    first_name = models.CharField(max_length=40, blank=False, null=False)
    last_name = models.CharField(max_length=40, blank=False, null=False)
    email = models.CharField(max_length=500, blank=True, null=False)
    phone = models.CharField(max_length=500, blank=False, null=False)
    zip =  models.IntegerField( blank=False, null=False)
    def __unicode__(self):
        return self.first_name
    class Meta:
        db_table = 'lohia_customer_db'
        managed = False

class ContactModel(models.Model):
    name = models.CharField(max_length=40, blank=False, null=False)
    email = models.CharField(max_length=40, blank=False, null=False)
    subject = models.CharField(max_length=500, blank=False, null=False)
    message = models.CharField(max_length=1000, blank=False, null=False)
    def __unicode__(self):
        return self.first_name
    class Meta:
        db_table = 'contact_details'
        managed = False