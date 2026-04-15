package org.testimonials.cms.security.config.filter;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.jspecify.annotations.Nullable;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.authorization.AuthorizationResult;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.access.intercept.RequestAuthorizationContext;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.testimonials.cms.security.services.IOperationService;

import java.util.function.Supplier;

@Component
@RequiredArgsConstructor
public class CustomAuthorizationManager implements AuthorizationManager<RequestAuthorizationContext> {

    private final IOperationService operationService;
    private final AntPathMatcher pathMatcher = new AntPathMatcher();

    @Override
    public @Nullable AuthorizationResult authorize(
            @NonNull Supplier<? extends @Nullable Authentication> authentication,
            @NonNull RequestAuthorizationContext object) {

        return new AuthorizationDecision(true);
//
//        Authentication auth = authentication.get();
//
//        HttpServletRequest request = object.getRequest();
//
//        String url = extractUrlFromRequest(request);
//        String httpMethod = request.getMethod();
//
//        if (isPublicEndpoint(url, httpMethod)) {
//            return new AuthorizationDecision(true);
//        }
//
//        if (auth == null || !auth.isAuthenticated()) {
//            return new AuthorizationDecision(false);
//        }
//
//        boolean granted = auth.getAuthorities().stream()
//                .anyMatch(authority ->
//                        isAuthorized(authority.getAuthority(), url, httpMethod));
//        return new AuthorizationDecision(granted);
    }

    private boolean isAuthorized(String permission, String url, String httpMethod) {
        if (permission == null || !permission.contains(":")) return false;

        int sep = permission.indexOf(":");
        String method = permission.substring(0, sep);
        String path = permission.substring(sep + 1);

        return method.equalsIgnoreCase(httpMethod)
                && pathMatcher.match(path, url);
    }

    private boolean isPublicEndpoint(String url, String httpMethod) {

        return operationService.getPublicOperations().stream()
                .anyMatch(op -> {
                    String fullPath = (op.basePath() + op.path());
                    return pathMatcher.match(fullPath, url)
                            && op.httpMethod().equalsIgnoreCase(httpMethod);
                });
    }

    private String extractUrlFromRequest(HttpServletRequest request) {
        String contextPath = request.getContextPath();
        String requestURI = request.getRequestURI();
        return requestURI.replace(contextPath, "");
    }
}
