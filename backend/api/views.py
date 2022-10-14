from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import Tweet
from .serializers import TweetSerializer

@api_view(['GET'])
def getTweeets(request):
    tweets= Tweet.objects.all()
    serializer = TweetSerializer(tweets,many=True,context={'request':request})
    return Response(serializer.data)

@api_view(['POST'])
def addTweet(request):
    serializer = TweetSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
    return Response()