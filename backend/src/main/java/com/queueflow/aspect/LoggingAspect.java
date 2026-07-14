package com.queueflow.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.StopWatch;

@Aspect
@Component
public class LoggingAspect {

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @Pointcut("within(com.queueflow.controller..*) || within(com.queueflow.service..*)")
    public void applicationPackagePointcut() {
        // Pointcut for all controllers and services
    }

    @Around("applicationPackagePointcut()")
    public Object logMethodExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        String methodName = joinPoint.getSignature().getDeclaringTypeName() + "." + joinPoint.getSignature().getName();
        
        log.debug("ENTER: {}", methodName);
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();

        try {
            Object result = joinPoint.proceed();
            stopWatch.stop();
            log.debug("EXIT: {} - Executed in {} ms", methodName, stopWatch.getTotalTimeMillis());
            return result;
        } catch (IllegalArgumentException e) {
            log.error("ILLEGAL ARGUMENT: {} in {}", java.util.Arrays.toString(joinPoint.getArgs()), methodName);
            throw e;
        } catch (Exception e) {
            log.error("EXCEPTION: {} in {}", e.getMessage(), methodName);
            throw e;
        }
    }
}
