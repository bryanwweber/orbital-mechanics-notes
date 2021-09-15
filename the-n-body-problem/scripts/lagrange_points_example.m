function lagrange_points_example
    % These masses represent the Earth-Moon system
    m1 = 5.974E24; % kg
    m2 = 7.348E22; % kg
    pi2 = m2/(m1 + m2);

    function y = collinear_lagrange(xstar)
        firstterm = xstar;
        secondterm = (1 - pi2) ./ abs(xstar + pi2).^3 .* (xstar + pi2);
        thirdterm = pi2 ./ abs(xstar - 1 + pi2).^3 .* (xstar - 1 + pi2);
        y = firstterm - secondterm - thirdterm;
    end
    options = optimset('Display','iter');
    L_2 = fzero(@collinear_lagrange,[1, 1.5],options);
    L_1 = fzero(@collinear_lagrange,[0.01, 0.97],options);
    L_3 = fzero(@collinear_lagrange,[-1, -1.5],options);
    fprintf('L_1=%f, L_2=%f, L_3=%f\n', L_1, L_2, L_3)

    function output
        figure()
        title('The Lagrange Points in the Earth-Moon System')
        hold on
        ylim([-1.2,1.2])
        xlim([-1.2,1.2])
        axis square
        xlabel('x^*')
        ylabel('y^*')
        plot(-pi2,0,'bo','MarkerFaceColor','b')
        plot(1-pi2,0,'go','MarkerFaceColor','g')
        plot(L_1,0,'rv','MarkerFaceColor','r')
        plot(L_2,0,'r^','MarkerFaceColor','r')
        plot(L_3,0,'rp','MarkerFaceColor','r')
        plot(0.5-pi2,sqrt(3)/2,'rX','MarkerFaceColor','r')
        plot(0.5-pi2,-sqrt(3)/2,'rs','MarkerFaceColor','r')
        plot([-pi2,0.5-pi2,1-pi2,0.5-pi2,-pi2], [0,sqrt(3)/2,0,-sqrt(3)/2,0], '--k')
        yline(0,'k')
        coords = linspace(0,pi,100);
        plot((1-pi2).*cos(coords),(1-pi2).*sin(coords))
        hold all
        plot((1-pi2).*cos(coords),-(1-pi2).*sin(coords))
        legend('$m_1$','$m_2$', '$L_1$', '$L_2$', '$L_3$', '$L_4$', '$L_5$','Interpreter','latex')
    end
    output
end

