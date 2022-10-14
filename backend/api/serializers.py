from rest_framework import serializers

from base.models import Tweet

class TweetSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tweet
        fields = ('username', 'tweet', 'created')