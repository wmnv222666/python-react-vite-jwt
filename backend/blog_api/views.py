from rest_framework import generics
from blog.models import Post
from .serializers import PostSerializer
from rest_framework.permissions import (
    SAFE_METHODS,
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
    AllowAny,BasePermission,
    IsAdminUser,
    DjangoModelPermissions,
)


class PostUserWritePermission(BasePermission):
    message = 'Editing posts is restricted to the author only.'

    def has_object_permission(self, request, view, obj):

        # if request.method in SAFE_METHODS:
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True

        return obj.author == request.user


class PostList(generics.ListCreateAPIView):
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny]
    queryset = Post.postobjects.all()
    serializer_class = PostSerializer
    # filter  and See your own posts
    def get_queryset(self):
        if self.request.user.is_authenticated:
            user = self.request.user
            return Post.postobjects.filter(author=user)
        else:
            return Post.postobjects.all()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PostDetail(generics.RetrieveUpdateDestroyAPIView, PostUserWritePermission):
    permission_classes = [PostUserWritePermission]
    queryset = Post.objects.all()
    serializer_class = PostSerializer


""" Concrete View Classes
# CreateAPIView
Used for create-only endpoints.
# ListAPIView
Used for read-only endpoints to represent a collection of model instances.
# RetrieveAPIView
Used for read-only endpoints to represent a single model instance.
# DestroyAPIView
Used for delete-only endpoints for a single model instance.
# UpdateAPIView
Used for update-only endpoints for a single model instance.
# ListCreateAPIView
Used for read-write endpoints to represent a collection of model instances.
RetrieveUpdateAPIView
Used for read or update endpoints to represent a single model instance.
# RetrieveDestroyAPIView
Used for read or delete endpoints to represent a single model instance.
# RetrieveUpdateDestroyAPIView
Used for read-write-delete endpoints to represent a single model instance.
"""
