import React from "react";
import Typewriter from "typewriter-effect";
import { useTranslation } from "react-i18next";

const AnimatedText = () => {
    const { t } = useTranslation();
    return (
        <section className="built-by py-20 bg-gradient-to-r from-pink-50 to-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900">
                {t('builtBy')}
                <br className="sm:hidden" />{" "}
                <span className="animated-text inline-block mt-2 sm:mt-0">
                    
                    <span className="text-pink-600">
                    <Typewriter
                        options={{
                        strings: t('builtFor', { returnObjects: true }),
                        autoStart: true,
                        loop: true,
                        deleteSpeed: 50,
                        delay: 100,
                        wrapperClassName: "typewriter-wrapper",
                        cursorClassName: "typewriter-cursor",
                        }}
                    />
                    </span>
                </span>
                </h2>
            </div>
        </section>
    )
}

export default AnimatedText