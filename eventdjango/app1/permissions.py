from rest_framework import permissions

class IsOwnerOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        # Allow authenticated users to access the view
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Allow superusers full access
        if request.user.is_superuser:
            return True

        # Restrict access to the owner of the object
        return obj.user == request.user
